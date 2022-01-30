from django.db import models
from django.contrib import admin
# Create your models here.

class predictCovid(models.Model):
    symptoms = models.CharField(max_length=300)