from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
import autocomplete_light
autocomplete_light.autodiscover()
from django.contrib import admin

admin.autodiscover()

# Sitemap
from django.contrib.sitemaps import Sitemap, FlatPageSitemap
from sitemap import StaticSitemap, ViewSitemap


urlpatterns = patterns('',
    # Homepage:
    #url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    url(r'^$', include('voyages.apps.static_content.urls', namespace='static_content')),
    # Short permalink
    url(r'^estimates/(?P<link_id>\w+)$', 'voyages.apps.assessment.views.restore_permalink', name='restore_e_permalink'),
    url(r'^voyages/(?P<link_id>\w+)$', 'voyages.apps.voyage.views.restore_permalink', name='restore_v_permalink'),

    #Include url handlers of each section
    url(r'^voyage/', include('voyages.apps.voyage.urls', namespace='voyage')),
    url(r'^assessment/', include('voyages.apps.assessment.urls', namespace='assessment')),
    url(r'^about/', include('voyages.apps.about.urls', namespace='about')),
    url(r'^education/', include('voyages.apps.education.urls', namespace='education')),
    url(r'^resources/', include('voyages.apps.resources.urls', namespace='resources')),
    url(r'^help/', include('voyages.apps.help.urls', namespace='help')),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^contribute/', include('voyages.apps.contribute.urls', namespace='contribute')),
    (r'^search/', include('haystack.urls', namespace='search')),
    url(r'^autocomplete/', include('autocomplete_light.urls')),

    # Handle language changes
    url(r'^setlanguage/(?P<lang_code>\w+)$', 'voyages.apps.common.views.set_language', name='set_lang'),

    # password rest urls
    url(r'^password/', include('password_reset.urls')),
)
# XML generated sitemap
sitemaps = {
    'staticpages' : StaticSitemap(urlpatterns),
}

# URLs not included in the sitemap
urlpatterns += patterns('',
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps}, name='sitemap-xml'),
    
    # Flatpages
    url(r'^pages/', include('django.contrib.flatpages.urls')),
    
    # Adding download files 
    url(r'^admin/downloads', 'voyages.apps.voyage.views.download_file', name="downloads"),

    # Admin documentation
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    
    # Admin management  
    url(r'^admin/', include(admin.site.urls)),
)

#Serving static files including files uploaded by users
if settings.DEBUG:
# static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^documents/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
