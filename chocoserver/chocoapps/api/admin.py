# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from models import ProductCategorie, Product, Location, ContactNumber, AboutU, DivyaSawhney, Home, News

# from image_cropping import ImageCroppingMixin
#
#
# class ProductCategorieAdmin(ImageCroppingMixin, admin.ModelAdmin):
#     pass

from django.forms import TextInput, Textarea
from django.db import models


class YourModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows':10, 'cols':100})}
    }


admin.site.register(ProductCategorie)
admin.site.register(Product)
admin.site.register(Location)
admin.site.register(ContactNumber)
admin.site.register(AboutU, YourModelAdmin)
admin.site.register(DivyaSawhney, YourModelAdmin)
admin.site.register(Home)
admin.site.register(News)
