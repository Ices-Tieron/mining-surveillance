from django.db import models

# Create your models here.
from django.contrib.gis.db import models
from django.contrib.auth.models import User

class MiningReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.TextField()
    status = models.CharField(default="Pending", max_length=20)
    location = models.PointField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class AIAnalysis(models.Model):
    report = models.ForeignKey(MiningReport, on_delete=models.CASCADE)
    prediction = models.TextField()
    confidence = models.FloatField()
    analyzed_at = models.DateTimeField(auto_now_add=True)
