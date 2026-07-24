# HelpDesk

HelpDesk e um sistema de atendimento para gerenciar chamados entre clientes, tecnicos e administradores.

O projeto sera desenvolvido como monorepo, com backend em Node.js e Express, banco de dados PostgreSQL, Prisma como ORM, TypeScript, Docker, autenticacao com JWT, validacoes com Zod e testes com Jest.

## Personas

- Admin: gerencia o sistema, cria e edita tecnicos, gerencia servicos, acompanha chamados e pode alterar o status dos chamados.
- Tecnico: atende chamados atribuidos a ele, edita o proprio perfil, adiciona servicos ao chamado quando necessario e altera o status do atendimento.
- Cliente: cria chamados, escolhe um tecnico disponivel, acompanha o historico dos proprios chamados e gerencia a propria conta.

## Funcionalidades Principais

- Autenticacao de usuarios com JWT.
- Cadastro e gerenciamento de tecnicos pelo admin.
- Cadastro, edicao e desativacao de servicos pelo admin.
- Criacao de chamados por clientes.
- Atribuicao de chamados a tecnicos disponiveis.
- Controle de status dos chamados: Aberto, Em atendimento e Encerrado.
- Historico de chamados para clientes.
- Calculo do valor total dos servicos vinculados a um chamado.

## Estrutura Do Projeto

```text
apps/
  backend/
    API do sistema HelpDesk
  frontend/
    Aplicacao web, que sera iniciada depois da base do backend
```

## Backend

Tecnologias iniciais:

- Node.js 20.20.2
- npm 10.8.2
- Express
- TypeScript
- Prisma 6.2.1
- PostgreSQL
- Docker

## Executando Com Docker

Na raiz do projeto:

```powershell
docker compose up -d postgres backend
```

A API ficara disponivel em:

```text
http://localhost:3333
```

Rota de verificacao:

```text
GET http://localhost:3333/health
```

Rota inicial de usuarios:

```text
GET http://localhost:3333/users
```

Para parar os containers:

```powershell
docker compose down
```

## Banco De Dados

O banco utilizado e PostgreSQL. As migrations ficam em:

```text
apps/backend/prisma/migrations
```

Para executar migrations dentro do container do backend:

```powershell
docker compose exec backend npx prisma migrate dev
```

## Status Atual

- Backend inicial configurado.
- Docker configurado para API e PostgreSQL.
- Prisma configurado com PostgreSQL.
- Model inicial de usuario criado.
- Migration inicial de usuarios criada.
- Rota `GET /users` organizada em arquivo de rotas.

## Fluxo De Branches

O projeto usa duas branches principais:

- `develop`: branch de desenvolvimento diario.
- `main`: branch estavel, usada para consolidar entregas.

O fluxo recomendado e desenvolver na `develop`, testar, commitar, fazer push e depois integrar na `main` quando uma etapa estiver funcionando.
