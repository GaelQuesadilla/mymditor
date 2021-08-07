from django.contrib.auth import login
from django.http import request
from django.http.response import HttpResponseNotAllowed, JsonResponse
from django.utils import datastructures
from django.views.generic import TemplateView, View
from django.shortcuts import render, redirect
from .forms import downloadRequest, uploadRequest
from .models import docCloud
import json

class docView(TemplateView):
    template_name = "docView.html"
    def get(self, request, *args, **kwargs):
        login= request.user.is_authenticated
        ctx = {"login": login}
        if login:
            ctx["username"] = request.user.username
        return render(request, self.template_name, ctx)


class download(View):
    def get(self, request, *args, **kwargs):
        pass
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseNotAllowed("POST")
        
        form = downloadRequest(request.POST)
        if not form.is_valid():
            return HttpResponseNotAllowed("POST")


        # dataDir must be an array with keys
        # author must be the username
        dataDir = json.loads(form.cleaned_data["dataDir"])
        author = request.user.username

        # cloud is an object in database 
        # cloudData is an dictionary with values
        cloud = docCloud.objects.get(author=author)
        data = json.loads(cloud.data)

        # go to element using dataDir values as keys
        for element in dataDir:
            if element != "":
                data = data[element]

        return JsonResponse({"data":data}, status=200)
        
        
        

class upload(View):
    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseNotAllowed("POST")
        
        form = uploadRequest(request.POST)
        if not form.is_valid():
            return HttpResponseNotAllowed("POST")


        # dataDir must be an array with keys
        # dataValue must be a dict with user local values
        # author must be the username
        dataDir = json.loads(form.cleaned_data.get("dataDir"))
        dataValue = json.loads(form.cleaned_data.get("values"))["value"]
        author = request.user.username

        # cloud is an object in database 
        # cloudData is an dictionary with values
        cloud = docCloud.objects.get(author=author)
        cloudData  = json.loads(cloud.data)
        data = cloudData

        # go to element using dataDir values as keys
        for element in dataDir:
            if element != "":
                try:
                    data = data[element]
                except KeyError:
                    # if keyWord dont exist create it with void dict 
                    data[element] = {}
                    data = data[element]
                    
        # Merge the values
        data |= dataValue

        # Save the new values on database 
        cloud.data = json.dumps(cloudData, indent=4)
        cloud.save()

        
        return JsonResponse({"upload":True}, status=200)