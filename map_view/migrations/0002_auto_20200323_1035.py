# Generated by Django 2.2 on 2020-03-23 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_view', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house_base',
            name='house_area',
            field=models.CharField(max_length=20),
        ),
    ]
