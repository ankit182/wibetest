from django.conf.urls import patterns, include, url
from django.contrib import admin
from wibe import settings
from wibe import views


urlpatterns = patterns('',
    # Examples:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.main_pg),
    url(r'^wibe/(?P<param>.*)/$', views.article_pg),
    url(r'^related/(?P<param>.*)/$', views.related),
    url(r'^pages/$', views.title_listing),
    url(r'^trending/$', views.trending_topics),
    url(r'^sitemap/(?P<param>.*)/$', views.sitemap)
)
handler404 = 'wibe.views.err404'