# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from image_cropping import ImageRatioField
# from django.contrib.sites.models import Site

# Create your models here.

class SingletonModel(models.Model):
    """Singleton Django Model
    Ensures there's always only one entry in the database, and can fix the
    table (by deleting extra entries) even if added via another mechanism.
    Also has a static load() method which always returns the object - from
    the database if possible, or a new empty (default) instance if the
    database is still empty. If your instance has sane defaults (recommended),
    you can use it immediately without worrying if it was saved to the
    database or not.
    Useful for things like system-wide user-editable settings.
    """

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """
        Save object to the database. Removes all other entries if there
        are any.
        """
        self.__class__.objects.exclude(id=self.id).delete()
        super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        """
        Load object from the database. Failing that, create a new empty
        (default) instance of the object and return it (without saving it
        to the database).
        """

        try:
            return cls.objects.get()
        except cls.DoesNotExist:
            return cls()


class ProductCategorie(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=30, blank=True)
    photo = models.ImageField(upload_to='media/', default = 'media/None/no-img.jpg', blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.FloatField()
    category = models.ForeignKey(ProductCategorie, null=True, blank=True)
    photo = models.ImageField(upload_to='media/', default='media/None/no-img.jpg', blank=True, null=True)

    def __str__(self):
        return self.name


class ContactNumber(models.Model):
    number = models.IntegerField()

    def __str__(self):
        return str(self.number)


class Location(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_hq = models.BooleanField()
    number = models.ForeignKey(ContactNumber, null=True, blank=True)

    def __str__(self):
        return self.name


class AboutU(SingletonModel):
    title = models.CharField(max_length=8000, blank=True)
    description = models.TextField(max_length=8000)
    photo = models.ImageField(upload_to='media/', default='media/None/no-img.jpg', blank=True, null=True)

    def __str__(self):
        return self.title