from django.http import request
from django.views.generic import View, TemplateView
from django.shortcuts import render, redirect

class docView(TemplateView):
    template_name = "docView.html"
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
