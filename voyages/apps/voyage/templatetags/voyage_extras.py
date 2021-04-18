from __future__ import unicode_literals
from builtins import str
from django.template import Template, Context
from django.template.defaultfilters import stringfilter
from voyages.apps.common.filters import jsonify, replaceStar, settings, template, trans_log

register = template.Library()
register.filter('trans_log', trans_log)
register.filter('jsonify', jsonify)
register.filter('replaceStar', replaceStar)

@register.filter
@stringfilter
def parse_blocks(value):
    """ use the django template loader and response object to spit 
    out rendered content
    """
    t = Template(value)
    c = Context({'MEDIA_URL': settings.MEDIA_URL})
    return t.render(c)


@register.filter
@stringfilter
def get_year_value(value):
    """ use the django template loader and response object to spit
    out rendered content
    """
    try:
        ret = value.split(",")[2]
    except:
        ret = ""
    return ret


@register.filter
@stringfilter
def translate_source_name(label_name):
    ret = ""
    for i in label_name.split("_"):
        ret += " " + i.capitalize()
    return ret


@register.filter
@stringfilter
def create_page_name(name, number):
    return str(name + "-" + str(number))

@register.filter
def replace(text, args):
    tmp = args.split('/')
    search_val = tmp[1]
    replace_val = tmp[2]
    import re
    return re.sub(search_val, replace_val, text)

@register.filter
def selected_choice(f):
    key = f.field.to_field_name or 'pk'
    matches = f.field.queryset.filter(**{key: f.value()})
    if len(matches) == 1:
        return matches[0]
    return None
