from django.conf.urls import *
from django.views.generic import TemplateView, RedirectView

urlpatterns = patterns('',
    url(r'^c(?P<chapternum>\d{2})_s(?P<sectionnum>\d{2})_p(?P<pagenum>\d{2})$',
        'voyages.apps.voyage.views.get_page', name='get-page'),
     url(r'^source_(?P<category>\w+)$',
        'voyages.apps.voyage.views.sources_list', name='sources-list')
)

urlpatterns += patterns('',
    url(r'^$', TemplateView.as_view(template_name='voyage/index.html'), name='index'),
    url(r'^understanding-db$', TemplateView.as_view(template_name='voyage/c01_base.html'), name='guide'),

    url(r'^c01_s01_cover$', TemplateView.as_view(template_name='voyage/c01_s01_cover.html'), name='voyage-guide-intro'),
    url(r'^c01_s03_cover$', 'voyages.apps.voyage.views.variable_list', name='variables'),
    url(r'^search', 'voyages.apps.voyage.views.search', name='search'),

    url(r'^contribute$', RedirectView.as_view(url='/contribute'), name='submission-login'),
    
    url(r'^voyage$', TemplateView.as_view(template_name='under_constr.html'), name='voyage'),

    url(r'^csv_all_download/(-?\d+)/$', 'voyages.apps.voyage.views.download_results', name='csv_all_download'),
)

urlpatterns += patterns('django.contrib.flatpages.views',
    url(r'^download$', 'flatpage', {'url': '/voyage/download/'}, name='download'),
)
