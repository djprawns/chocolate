# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from serializers import ProductCategorieSerializer, ProductSerializer, AboutUsSerializer, DivyaSawhneySerializer, HomeSerializer, HomeDescSerializer, NewsSerializer
from models import ProductCategorie, Product, AboutU, DivyaSawhney, Home, News


@api_view(['GET'])
def categories_list(request):
    if request.method == 'GET':
        categories = ProductCategorie.objects.all()
        serializer = ProductCategorieSerializer(categories, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def about_us(request):
    if request.method == 'GET':
        about_us = AboutU.objects.all()
        serializer = AboutUsSerializer(about_us, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def divya(request):
    if request.method == 'GET':
        about_us = DivyaSawhney.objects.all()
        serializer = DivyaSawhneySerializer(about_us, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def home(request):
    if request.method == 'GET':
        homes = Home.objects.all()
        serializer = HomeSerializer(homes, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def home_desc(request):
    if request.method == 'GET':
        homes = Home.objects.all()
        # print homes
        # homes = list(homes)
        serializer = HomeDescSerializer(homes, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def products_list(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        id = body['id']
        products = Product.objects.filter(category_id=id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def news_list(request):
    if request.method == 'GET':
        events = News.objects.all()
        serializer = NewsSerializer(events, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def news_item(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        id = body['id']
        news = News.objects.filter(id=id)
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)
