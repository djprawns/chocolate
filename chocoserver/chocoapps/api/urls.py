from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^categories/$', views.categories_list),
    url(r'^products/$', views.products_list),
    url(r'^about_us/$', views.about_us),
    url(r'^divya/$', views.divya),
    url(r'^home/$', views.home),
    url(r'^home_desc/$', views.home_desc),
    url(r'^news/$', views.news_list),
    url(r'^news_item/$', views.news_item),
]
