from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length = 200)
    email = models.EmailField(max_length = 200)
    idade = models.IntegerField()
    senha = models.CharField(max_length = 50)
    creditos = models.FloatField()

    def __srt__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length = 200)
    imagem = models.FileField(upload_to="arquivos_midia")
    preco = models.FloatField()
    quantidade = models.IntegerField()

    def __str__(self):
        return self.nome