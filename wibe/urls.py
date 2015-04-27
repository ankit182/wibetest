from django.conf.urls import patterns, include, url
from django.contrib import admin
from wibe import settings
from wibe import views


urlpatterns = patterns('',
    # Examples:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.main_pg)
)