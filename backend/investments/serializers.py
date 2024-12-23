from rest_framework import serializers
from .models import Coin, UserCoin, Transaction

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ('id', 'name', 'symbol')

class UserCoinSerializer(serializers.ModelSerializer):
    coin = CoinSerializer()
    
    class Meta:
        model = UserCoin
        fields = ('id', 'coin', 'amount')

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'type', 'amount', 'frequency', 'status', 'created_at')
        read_only_fields = ('id', 'created_at')