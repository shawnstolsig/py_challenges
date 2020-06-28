from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    '''
    '   Extends Django's base User class.
    '''

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dark_mode_enabled = models.BooleanField(default=False)

    date_created = models.DateTimeFiled(auto_now_add=True)
    date_updated = models.DateTimeFiled(auto_now=True)

    def __str__(self):
        return self.user.username

class Code(models.Model):
    '''
    '   Represents a user's code for a given challenge.
    '''

    user = models.ForeignKey(User, on_delete=models.CASACDE, related_name="snippets")
    code = models.TextField(null=True, blank=True)
    # store the id of the code challenge here.  can't use ForeignKey because challenges are not stored in the database.
    challenge = models.CharField(max_length=50)     

    date_created = models.DateTimeFiled(auto_now_add=True)
    date_updated = models.DateTimeFiled(auto_now=True)