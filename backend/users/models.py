from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    iban = models.CharField(max_length=34, blank=True)
    bic = models.CharField(max_length=11, blank=True)
    
    class Meta:
        db_table = 'users'

class Role(models.Model):
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User, related_name='roles')
    
    class Meta:
        db_table = 'roles'

class Permission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='permissions')
    module = models.CharField(max_length=100)
    action = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'permissions'
        unique_together = ('role', 'module', 'action')