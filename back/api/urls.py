from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet, ProdutoViewSet

router = DefaultRouter()

router.register(r'usuarios',UsuarioViewSet)
router.register(r'produtos',ProdutoViewSet)

urlpatterns = [
    path('', include(router.urls))
]