# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from serializers import ProductCategorieSerializer, ProductSerializer, AboutUsSerializer
from models import ProductCategorie, Product, AboutU


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


@api_view(['POST'])
def products_list(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        id = body['id']
        # print request.META
        products = Product.objects.filter(category_id=id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
