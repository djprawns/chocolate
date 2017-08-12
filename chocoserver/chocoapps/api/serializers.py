from models import ProductCategorie, Product, AboutU
from django.conf import settings
from rest_framework import serializers


class ProductCategorieSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField('get_url')

    class Meta:
        model = ProductCategorie
        fields = ('id', 'name', 'photo')

    def get_url(self, obj):
        return settings.DOMAIN + obj.photo.url


class ProductSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField('get_url')

    class Meta:
        model = Product
        fields = ('id', 'name', 'photo', 'price')

    def get_url(self, obj):
        return settings.DOMAIN + obj.photo.url


class AboutUsSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField('get_url')

    class Meta:
        model = AboutU
        fields = ('title', 'description', 'photo')

    def get_url(self, obj):
        return settings.DOMAIN + obj.photo.url