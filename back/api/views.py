from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Produto
from .serializers import UsuarioSerializer, ProdutoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ProdutoViewSet(viewsets.ModelViewSet):

    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer