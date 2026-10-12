from rest_framework import viewsets
from .models import ChildProfile
from .serializers import ChildProfileSerializer

class ChildProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ChildProfileSerializer
    queryset = ChildProfile.objects.all()
