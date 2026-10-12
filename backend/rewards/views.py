from rest_framework import viewsets
from .models import Reward
from .serializers import RewardSerializer

class RewardViewSet(viewsets.ModelViewSet):
    serializer_class = RewardSerializer

    def get_queryset(self):
        profile_id = self.request.query_params.get('profile_id')
        queryset = Reward.objects.all()
        if profile_id:
            queryset = queryset.filter(child_profile_id=profile_id)
        return queryset
