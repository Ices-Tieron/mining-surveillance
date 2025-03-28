from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import MiningReport, AIAnalysis
import jwt
from django.conf import settings
from django.core.files.storage import default_storage  # Added this import

SECRET_KEY = settings.SECRET_KEY

def generate_token(user):
    return jwt.encode({"user_id": user.id}, SECRET_KEY, algorithm="HS256")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    image = request.FILES.get("image")
    if image:
        path = f"uploads/{image.name}"
        default_storage.save(path, image)
        report = MiningReport.objects.create(
            user=request.user, 
            image_url=default_storage.url(path)
        )
        return JsonResponse({
            "image_url": report.image_url, 
            "status": report.status
        }, status=201)
    return JsonResponse({"error": "Invalid request"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_reports(request):
    reports = MiningReport.objects.all().values()
    return JsonResponse(list(reports), safe=False)