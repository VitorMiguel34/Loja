from rest_framework import serializers
from .models import Usuario, Produto

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nome','email','idade','senha','creditos','id']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ["nome","imagem","preco","quantidade", "id"]