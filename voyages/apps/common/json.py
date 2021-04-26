from __future__ import unicode_literals

import sys

import six
from django.core.serializers.base import DeserializationError
from django.core.serializers.json import Serializer as DjangoJsonSerializer
from django.core.serializers.python import Deserializer
import ijson

Serializer = DjangoJsonSerializer


def deserializer(stream_or_string, **options):

    if isinstance(stream_or_string, six.string_types):
        stream_or_string = six.BytesIO(stream_or_string.encode('utf-8'))
    try:
        objects = ijson.items(stream_or_string, 'item')
        for obj in Deserializer(objects, **options):
            yield obj
    except GeneratorExit:
        raise
    except Exception as e:
        # Map to deserializer error
        six.reraise(DeserializationError, DeserializationError(e),
                    sys.exc_info()[2])
