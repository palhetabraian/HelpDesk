# HelpDesk Backend

API do sistema HelpDesk, responsável por autenticação, controle de permissões, gerenciamento de usuários, serviços e chamados.

Este backend faz parte de um monorepo. O frontend será documentado separadamente quando for iniciado.

## Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma
- Docker
- JWT
- Zod
- Multer
- Jest
- Supertest

## Funcionalidades

- Cadastro público de clientes.
- Login com JWT.
- Controle de acesso por perfil: Admin, Técnico e Cliente.
- Gerenciamento de administradores.
- Gerenciamento de técnicos.
- Gerenciamento de clientes.
- Cadastro, edição, listagem e desativação de serviços.
- Criação e acompanhamento de chamados.
- Adição de serviços extras em chamados.
- Alteração de status dos chamados.
- Upload de imagem de perfil para técnico e cliente.
- Testes automatizados das principais rotas.

## Perfis

| Perfil | O que pode fazer |
| --- | --- |
| Admin | Gerencia usuários, serviços e todos os chamados |
| Técnico | Visualiza chamados atribuídos, adiciona serviços e altera status |
| Cliente | Cria chamados e visualiza o próprio histórico |

## Regras principais

- Usuários criados em `/users` sempre são clientes.
- Técnico criado pelo Admin recebe senha provisória e precisa trocar a senha no primeiro acesso.
- Técnico criado pelo Admin recebe horários padrão de atendimento.
- Serviço desativado não aparece na listagem de serviços ativos.
- Cliente não pode alterar chamado depois de criado.
- Técnico só pode alterar chamados atribuídos a ele.
- Um mesmo serviço não pode ser adicionado duas vezes ao mesmo chamado.
- Ao excluir um cliente, os chamados dele também são removidos.

## Estrutura

```text
apps/backend/
  prisma/
  src/
    configs/
    controllers/
    infra/database/
    providers/
    routes/
    schemas/
    shared/
    types/
  tests/
```

| Pasta | Responsabilidade |
| --- | --- |
| `prisma` | Schema, migrations e seed |
| `controllers` | Recebem requisições e retornam respostas |
| `routes` | Registram endpoints e middlewares |
| `schemas` | Validações com Zod |
| `shared` | Erros e middlewares globais |
| `providers` | Recursos auxiliares, como upload em disco |
| `tests` | Testes com Jest e Supertest |

## Variáveis de ambiente

Crie um arquivo `.env` em `apps/backend`:

```env
PORT=3333
JWT_SECRET=helpdesk-secret
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/helpdesk?schema=public
```

Para rodar comandos localmente fora do container, use `localhost`:

```powershell
$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/helpdesk?schema=public"
```

## Como executar

Na raiz do projeto:

```powershell
npm install
docker compose up -d postgres backend
```

Rodar migrations:

```powershell
docker compose exec backend npx prisma migrate dev
```

Rodar seed:

```powershell
docker compose exec backend npx prisma db seed
```

A API fica disponível em:

```text
http://localhost:3333
```

Rota de teste:

```http
GET /health
```

## Scripts

Execute dentro de `apps/backend`:

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia a API em desenvolvimento |
| `npm run typecheck` | Verifica erros de TypeScript |
| `npm run build` | Compila o projeto |
| `npm start` | Executa o build |
| `npm test` | Executa os testes |

## Testes

Para rodar os testes localmente:

```powershell
cd apps/backend
$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/helpdesk?schema=public"
npm test
```

Cobertura atual de testes:

- saúde da API;
- autenticação;
- criação de técnicos;
- serviços;
- chamados.

## Endpoints principais

### Autenticação e perfil

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/users` | Cria cliente |
| `POST` | `/sessions` | Login |
| `GET` | `/me` | Dados do token |
| `GET` | `/profile` | Perfil autenticado |
| `PATCH` | `/profile` | Atualiza perfil |

### Admin

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/admins` | Lista admins |
| `POST` | `/admins` | Cria admin |
| `PATCH` | `/admins/:id` | Edita admin |
| `DELETE` | `/admins/:id` | Exclui admin |

### Técnicos

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/technicians` | Lista técnicos |
| `POST` | `/technicians` | Cria técnico |
| `PATCH` | `/technicians/:id` | Edita técnico |
| `PATCH` | `/technicians/:id/available-hours` | Atualiza horários |
| `PATCH` | `/technicians/me/password` | Altera senha |
| `PATCH` | `/technicians/me/avatar` | Atualiza avatar |

### Clientes

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/clients` | Lista clientes |
| `PATCH` | `/clients/:id` | Edita cliente |
| `DELETE` | `/clients/:id` | Exclui cliente |
| `PATCH` | `/clients/me/avatar` | Atualiza avatar |

### Serviços

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/services` | Lista serviços ativos |
| `POST` | `/services` | Cria serviço |
| `PATCH` | `/services/:id` | Edita serviço |
| `PATCH` | `/services/:id/deactivate` | Desativa serviço |

### Chamados

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/tickets` | Cria chamado |
| `GET` | `/tickets/me` | Lista chamados do cliente |
| `GET` | `/tickets/technician` | Lista chamados do técnico |
| `GET` | `/tickets` | Lista todos os chamados |
| `POST` | `/tickets/:id/services` | Adiciona serviço ao chamado |
| `PATCH` | `/tickets/:id/status` | Atualiza status |

## Seed

A seed cria:

- 1 Admin;
- 3 Técnicos;
- 5 Serviços.

Credenciais do Admin:

```text
email: admin@helpdesk.com
senha: admin123
```

Senha inicial dos técnicos:

```text
tecnico123
```

## Observação

Este README descreve somente o backend. Informações de deploy serão adicionadas depois.
