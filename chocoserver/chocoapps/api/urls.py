from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^categories/$', views.categories_list),
    url(r'^products/$', views.products_list),
    url(r'^about_us/$', views.about_us),
]
