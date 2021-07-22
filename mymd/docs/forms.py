
from django import forms

class downloadRequest(forms.Form):

    dataDir = forms.CharField(max_length=250, required=True)

class uploadRequest(forms.Form):

    dataDir = forms.CharField(max_length=250, required=True)
    values = forms.CharField()