from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'type', 'message', 'amount', 'is_read', 'created_at')
        read_only_fields = ('id', 'created_at')