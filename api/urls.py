from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('user', views.UserViewSet, basename="users")
router.register('profile', views.ProfileViewSet, basename='profiles')
router.register('code', views.CodeViewSet, basename="codes")
router.register('completions', views.CompletionViewSet, basename="completions")
urlpatterns = router.urls

from django.urls import path
urlpatterns += [
    path('test/', views.test_json)
]