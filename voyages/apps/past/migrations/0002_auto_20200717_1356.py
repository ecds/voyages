# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2020-07-17 13:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('past', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EnslavedName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('language', models.CharField(max_length=3)),
                ('recordings_count', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='enslavedsourceconnection',
            name='enslaved',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sources_conn', to='past.Enslaved'),
        ),
        migrations.AlterUniqueTogether(
            name='enslavedname',
            unique_together=set([('name', 'language')]),
        ),
        migrations.RunSQL(['ALTER TABLE `voyages`.`past_enslavedname` CHANGE COLUMN `name` `name` VARCHAR(255) CHARACTER SET \'utf8mb4\' COLLATE \'utf8mb4_bin\' NOT NULL;'], reverse_sql=migrations.RunSQL.noop),
    ]