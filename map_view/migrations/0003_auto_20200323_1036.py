# Generated by Django 2.2 on 2020-03-23 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_view', '0002_auto_20200323_1035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house_base',
            name='img',
            field=models.CharField(max_length=200),
        ),
    ]
