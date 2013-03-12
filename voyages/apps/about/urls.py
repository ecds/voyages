from django.conf import settings
from django.conf.urls.defaults import patterns, include, url

# To be used later:
# from voyages.apps.about.views import *

urlpatterns = patterns('django.views.generic.simple',
    url(r'^$', 'direct_to_template', {'template': 'about/index.html'}),
    url(r'^index.html$', 'direct_to_template', {'template': 'about/index.html'}),
    
    #handle all cases for now
    url(r'^[\w\.\-]+\.html$', 'direct_to_template', {'template': 'about/index.html'}),
)

