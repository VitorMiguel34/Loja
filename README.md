# 🛍️ Loja virtual

Este é um projeto de e-commerce completo (Loja Virtual) desenvolvido como treino para consolidar conhecimentos em **React** (Frontend) e **Django REST Framework** (Backend).

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React, JavaScript | Interface do usuário e lógica de apresentação. |
| **Estilização** | TalwindCSS / Styled-Components | Estilizaçāo completa |
| **Rotas** | React Router DOM | Gerenciamento de navegação entre as páginas. |
| **Backend** | Django REST Framework (DRF) | Criação da API RESTful para servir os dados. |
| **Linguagem** | Python 3 | Lógica de negócio e manipulação de dados no servidor. |
| **Banco de Dados** | SQLite3 | Persistência dos dados de produtos, usuários e pedidos. |

---

## 🌟 Principais Funcionalidades

* **Autenticação(ainda incompleta):** Cadastro e Login de usuários.
* **Catálogo de Produtos:** Visualização de todos os produtos com detalhes.
* **Carrinho de Compras:** Adicionar, remover e atualizar a quantidade de itens.
* **Checkout Simplificado:** Simulação do processo de finalização de compra e criação de pedidos.
* **Área do Usuário:** Visualizaçāo das informações do usuário
* **Sistema de Rotas Privadas** (Proteção de rotas como "usuario").

---

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto na sua máquina local.

### 1. Pré-requisitos

Certifique-se de ter instalado:

* Node.js e npm (ou yarn)
* Python 3
* Pip (gerenciador de pacotes do Python)

### 2. Configurando o Backend (API Django REST)

Entre na pasta do backend ("back").

```bash
# 1. Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Linux/macOS
# ou
.\venv\Scripts\activate   # No Windows

# 2. Instale as dependências
pip install -r requirements.txt 

# 3. Realize as migrações do banco de dados
python manage.py makemigrations
python manage.py migrate

# 4. Inicie o servidor
python manage.py runserver
```

### 3. Rodando o servidor react

```bash
# 1. Navegue até "front/loja"
cd front/loja

# 2. Instale as dependências do Node
npm install
# ou 
yarn install

# 2. Inicie a aplicação React
npm run dev
#
yarn start
```
