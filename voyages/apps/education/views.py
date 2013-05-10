# Create your views here.
from django.http import Http404
from django.template import TemplateDoesNotExist, Context, loader, RequestContext
from django.shortcuts import render_to_response
from voyages.apps.education.models import *
from voyages.apps.contribute.models import *

def lessonplan(request):
    # We might want to do some error checking for pagenum here. Even though 404 will be raised if needed
    lessons_all = LessonPlan.objects.order_by('order')
    standards_all = LessonStandard.objects.all()
    
    lesson_plan_list = []
    
    # Iterate and retrieve all nested submenus
    for lesson in lessons_all:
        sub_lesson = []
        
        standard_list = standards_all.filter(lesson=lesson.id).order_by('type')
        standard_type_list = standard_list.values_list('type', flat=True).distinct()
        
        for std_type in standard_type_list:
            text_list = standard_list.filter(type=std_type)
            sub_lesson.append({'type' : std_type, 'text' : text_list})
        
        lesson_plan_list.append({'lesson' : lesson, 'standard' : sub_lesson})
    
    return render_to_response('education/lesson-plans.html', {"lesson_plans" : lesson_plan_list},
                              context_instance=RequestContext(request));
                            