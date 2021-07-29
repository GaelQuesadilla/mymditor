
from .forms import userRegisterForm
from docs.models import docCloud
from django.http import request
from django.views.generic import View, TemplateView
from django.shortcuts import render, redirect

class index(TemplateView):
    template_name = "index.html"
    def get(self, request, *args, **kwargs):
        login = request.user.is_authenticated
        ctx = {"login": login}
        if login:
            ctx["username"] = request.user.username
        return render(request, self.template_name, context=ctx)


#? register view
class register(TemplateView):
    def get(self, request, *args, **kwargs):
        return render(request, "register.html", context={"userRegisterForm": userRegisterForm})
    
    def post(self, request, *args, **kwargs):
        form = userRegisterForm(request.POST)

        if form.is_valid():
            form.save()
            
            # Create the user cloud 
            author = form.cleaned_data["username"]
            docCloud.objects.create(author = author)

            return redirect("index")
        else:
            return redirect("register")
    