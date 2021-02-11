# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2020-11-25 20:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('past', '0003_enslaved_editor_modern_names_certainty'),
    ]

    operations = [
        migrations.AddField(
            model_name='enslavedcontribution',
            name='is_multilingual',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='enslavedcontribution',
            name='token',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]