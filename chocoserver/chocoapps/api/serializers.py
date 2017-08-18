from models import ProductCategorie, Product, AboutU, DivyaSawhney, Home, News
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


class DivyaSawhneySerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField('get_url')

    class Meta:
        model = DivyaSawhney
        fields = ('title', 'description', 'photo')

    def get_url(self, obj):
        return settings.DOMAIN + obj.photo.url


class HomeSerializer(serializers.ModelSerializer):
    photo1 = serializers.SerializerMethodField('get_url1')
    photo2 = serializers.SerializerMethodField('get_url2')
    photo3 = serializers.SerializerMethodField('get_url3')
    photo4 = serializers.SerializerMethodField('get_url4')
    photo5 = serializers.SerializerMethodField('get_url5')
    photo6 = serializers.SerializerMethodField('get_url6')
    photo7 = serializers.SerializerMethodField('get_url7')
    photo8 = serializers.SerializerMethodField('get_url8')

    class Meta:
        model = Home
        fields = ('photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8')

    def get_url1(self, obj):
        return settings.DOMAIN + obj.photo1.url

    def get_url2(self, obj):
        return settings.DOMAIN + obj.photo2.url

    def get_url3(self, obj):
        return settings.DOMAIN + obj.photo3.url

    def get_url4(self, obj):
        return settings.DOMAIN + obj.photo4.url

    def get_url5(self, obj):
        return settings.DOMAIN + obj.photo5.url

    def get_url6(self, obj):
        return settings.DOMAIN + obj.photo6.url

    def get_url7(self, obj):
        return settings.DOMAIN + obj.photo7.url

    def get_url8(self, obj):
        return settings.DOMAIN + obj.photo8.url


class HomeDescSerializer(serializers.ModelSerializer):

    class Meta:
        model = Home
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField('get_url')

    class Meta:
        model = News
        fields = ('id', 'title', 'description', 'photo')

    def get_url(self, obj):
        return settings.DOMAIN + obj.photo.url
