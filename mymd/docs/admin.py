
from django.contrib import admin
from .models import docCloud

# Register your models here.

class cloudDisplay(admin.ModelAdmin):
    list_display = ("author", "data")
    search_fields = ("author",)
    list_filter = ('author',)

admin.site.register(docCloud, cloudDisplay)