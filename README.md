# Desafio Técnico - Falaê  

Este repositório contém o projeto desenvolvido para o desafio técnico do processo seletivo de estágio no **Falaê**. A aplicação foi construída utilizando **Next.js**, **Tailwind CSS**, **TypeScript**, **Fastify**, **Prisma ORM**, **Zod**, e **SQLite** como banco de dados local.  

## 📋 Visão Geral  

A aplicação tem como objetivo gerenciar produtos e pedidos de um restaurante, permitindo:  
- Cadastro, visualização, edição e exclusão de produtos.  
- Criação e gerenciamento de pedidos associados a usuários.  

## 🛠 Tecnologias Utilizadas  

- **Frontend**:  
  - Framework: [Next.js](https://nextjs.org/)  
  - Estilização: [Tailwind CSS](https://tailwindcss.com/)  
- **Backend**:  
  - Framework: [Fastify](https://www.fastify.io/)  
  - Validação: [Zod](https://zod.dev/)  
  - ORM: [Prisma ORM](https://www.prisma.io/)  
  - Banco de Dados: [SQLite](https://www.sqlite.org/)  
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)  

## ⚙️ Configuração do Ambiente  

### Pré-requisitos  
Certifique-se de ter instalados:  
- **Node.js** (v20 ou superior)  
- **Yarn** ou **npm**  
- **SQLite** (opcional, já integrado com Prisma)  

### Passos para rodar o projeto  

1. **Clone o repositório**  
   Clone o repositório em sua máquina local:  
   ```bash
   git clone https://github.com/pedro-augbs/desafio-falae.git
   cd desafio-falae

2. **Instale as dependências**
   Certifique-se de instalar as dependências em ambos os diretórios (api e web):
   ```bash
   # Instale as dependências da API
   cd api
   npm install

   # Instale as dependências do frontend
   cd ../web
   npm install

3. Configure as variáveis de ambiente
   Crie um arquivo .env na pasta api com o seguinte conteúdo:
   ```bash
   DATABASE_URL="file:./dev.db"

4. Execute as migrações do banco de dados
   Inicialize o banco de dados e aplique as migrações:
   ```bash
   cd api
   npx prisma migrate dev --name init

5. Inicie os servidores
   ```bash
   # Para iniciar o backend:
   cd api
   npm run dev

   # Para iniciar o frontend:
   cd web
   npm run dev

6. Acesse a aplicação
   API: http://localhost:3333
   Frontend: http://localhost:3000
