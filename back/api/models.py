from django.db import models

class User(models.Model):
    name = models.CharField(max_length = 200)
    email = models.EmailField(max_length = 200)
    age = models.IntegerField()
    password = models.CharField(max_length = 50)
    balance = models.FloatField()

    def __srt__(self):
        return self.nome

class Product(models.Model):
    name = models.CharField(max_length = 200)
    image = models.FileField(upload_to="arquivos_midia")
    price = models.FloatField()
    quantity = models.IntegerField()

    def __str__(self):
        return self.nome