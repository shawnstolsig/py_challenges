from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    '''
    '   Extends Django's base User class.
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    dark_mode_enabled = models.BooleanField(default=False)
    tab_size = models.IntegerField(default=2)
    editor_theme = models.CharField(max_length=50, default='github')

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

class Code(models.Model):
    '''
    '   Represents a user's code for a given challenge.
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="snippets")
    code = models.TextField(null=True, blank=True)
    # store the id of the code challenge here.  can't use ForeignKey because challenges are not stored in the database.
    challenge = models.CharField(max_length=50)     
    title = models.CharField(max_length=100)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} ({self.date_updated})'