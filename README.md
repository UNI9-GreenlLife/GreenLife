# GreenLife - Sistema de Gerenciamento de Funcionários

## 🔍 Visão Geral
GreenLife é uma aplicação full-stack com o objetivo de gerenciar dados de Recursos Humanos. O sistema permite que usuários autenticados realizem operações de CRUD (Create, Read, Update, Delete) sobre uma base de funcionários. Cada funcionário possui os seguintes atributos:

- Nome
- Email
- Telefone
- Cargo
- Salário

A arquitetura do projeto segue uma separação clara entre frontend e backend, com três camadas principais no backend.

---

## 🤖 Tecnologias Utilizadas

### Backend:
- **.NET 7 (ASP.NET Core)**: Framework para a construção da API RESTful
- **Entity Framework Core**: ORM para mapeamento objeto-relacional
- **SQL Server**: Banco de dados relacional
- **ASP.NET Core Identity**: Autenticação e autorização
- **FluentValidation**: Biblioteca para validação de regras de negócio

### Frontend:
- **React (SPA)**: Aplicativo de página única
- **Lucide-react**: Biblioteca moderna de ícones vetoriais
- **Framer Motion (Spring Animations)**: Biblioteca para animações e transições visuais

---

## 🌐 Estrutura do Backend (3 Camadas)

### 1. Business Layer
- Define as interfaces dos serviços
- Implementa regras de negócio
- Realiza validações com FluentValidation
- Abstração das funcionalidades em serviços reutilizáveis

### 2. Data Layer
- Configura o ORM (Entity Framework Core)
- Define DbContexts e mapeamentos
- Implementa o padrão Repository para o acesso a dados

### 3. Server Layer
- Define os endpoints HTTP nas Controllers
- Implementa autenticação e autorização com Identity
- Recebe as requisições do frontend e direciona para os serviços corretos

---

## 📊 Funcionalidades

- Registro e autenticação de usuários com Identity
- CRUD de funcionários:
  - Cadastro de novos funcionários
  - Atualização de dados
  - Exclusão
  - Listagem com detalhes
- Validações de dados em ambas as camadas (frontend e backend)
- Interface responsiva e animada com framer-motion

---

## 🔧 Banco de Dados
- **SQL Server** com mapeamento via Entity Framework Core
- Migrations automáticas para atualização de esquema
- Relacionamentos definidos via fluent API

---

## ✅ Considerações Finais
Este projeto foi desenvolvido com foco em boas práticas de arquitetura, manutenção e escalabilidade. A divisão por camadas permite fácil expansão futura para novas entidades e funcionalidades.

O sistema serve como base sólida para projetos empresariais que envolvam gestão de dados administrativos de forma segura, modular e performática.
