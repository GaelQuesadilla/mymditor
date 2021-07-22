from django.db import models

class docCloud(models.Model):
    author = models.CharField(max_length=30, null=False, blank=False, unique=True)

    data = models.TextField(default="""
    {"style":{"nigthMode":false},"documents":{"value":{}}}"""
    , unique=False)
