# Generated by Django 4.2.3 on 2024-02-19 00:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_user_is_email_verified_alter_user_role"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="is_email_verified",
            field=models.BooleanField(default=False),
        ),
    ]
