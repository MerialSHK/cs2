from django.db import models
from users.models import User

class Notification(models.Model):
    TYPES = (
        ('deposit', 'Deposit Request'),
        ('withdrawal', 'Withdrawal Request'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=20, choices=TYPES)
    message = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']