# 📦 Logibox Frontend

O *Logibox* é um sistema de gerenciamento de estoque.  
Este repositório contém *apenas a parte de front-end* do projeto, construída com *HTML, CSS, JavaScript* e *Bootstrap*, seguindo boas práticas de organização de pastas e versionamento com Git.

---

## 🏢 Sobre a Logibox
A *Logibox* é uma empresa fictícia criada com o objetivo de desenvolver soluções digitais para controle de estoque.  
Nosso sistema tem como foco a *organização, segurança e escalabilidade*, permitindo que empresas gerenciem seus produtos, usuários e registros de forma eficiente.  

No back-end (em outro repositório), utilizamos *PHP* e *MySQL* para persistência de dados.  
Aqui, neste repositório, você encontrará toda a estrutura *visual e interativa (frontend)* do sistema.

---

## ⚙ Tecnologias utilizadas
  ### Frontend:
   - HTML5
   - CSS3
   - JavaScript 
   - Bootstrap 

  ### Backend (outro repositório):
   - PHP 8
   - MySQL
   - vm

  ### Ferramentas de apoio:
   - Git & GitHub (controle de versão)
   - MVC (arquitetura base: Models, Views, Controllers)
   - Services (serviços auxiliares, como autenticação e logs)

---

## 🌱 Fluxo de Branches

O versionamento segue uma adaptação do *Git Flow*:

- *main* → branch estável, sempre pronta para deploy.  
- *dev* → branch de integração, onde todas as features são testadas juntas.  
- *feature/* → usada para novas funcionalidades (ex: feature/login, feature/componentes-modal).  
- *fix/* → correções pequenas.  
- *hotfix/* → correções urgentes direto no main.  
- *docs/* → atualizações de documentação

---
## 🗂 Estrutura de Pasta
logibox-frontend/
│── public/                # arquivos acessíveis no navegador
│   ├── index.php          # ponto de entrada
│   ├── assets/
│   │   ├── css/           # estilos globais
│   │   ├── js/            # scripts de interação
│   │   ├── img/           # imagens utilizadas
│
│── src/                   # código-fonte do sistema
│   ├── components/        # componentes reutilizáveis
│   │   ├── button/        # botão (HTML/CSS/JS)
│   │   ├── modal/         # modal de login/cadastro
│   │   ├── navbar/        # barra de navegação
│   │   └── …
│   ├── views/             # telas do sistema
│   │   ├── login.php
│   │   ├── cadastro.php
│   │   ├── dashboard.php
│   │   └── usuarios.php
│   ├── controllers/       # lógica de interação com o backend
│   │   ├── UsuarioController.php
│   │   └── ProdutoController.php
│   ├── models/            # estruturas de dados ligadas ao banco
│   │   ├── Usuario.php
│   │   └── Produto.php
│   ├── services/          # serviços auxiliares (ex: autenticação, logs)
│
│── config/                # configurações do projeto
│   ├── env.php
│   ├── db.php
│
│── database/              # scripts SQL (migrations e seeds)
│   ├── schema.sql
│   └── seeds.sql
│
│── docs/                  # documentação adicional
│── tests/                 # testes futuros
