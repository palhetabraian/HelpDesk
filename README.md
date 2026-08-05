<div align="center">

# HelpDesk

Sistema Full Stack para gerenciamento de chamados técnicos, com controle de acesso para administradores, técnicos e clientes.

</div>

---

## Sobre o projeto

O **HelpDesk** é uma aplicação Full Stack desenvolvida para centralizar a criação, distribuição e o acompanhamento de chamados técnicos.

A plataforma possui diferentes níveis de acesso, permitindo que cada tipo de usuário tenha funcionalidades e permissões específicas.

Os clientes podem solicitar serviços e selecionar um técnico disponível. Os técnicos podem acompanhar os chamados atribuídos, adicionar serviços extras e atualizar o andamento dos atendimentos. Já os administradores possuem acesso ao gerenciamento completo da aplicação.

---

## Tipos de usuário

### Administrador

O administrador é responsável pela gestão da plataforma.

Principais funcionalidades:

* Criar contas de técnicos;
* Listar e editar técnicos;
* Definir horários de disponibilidade;
* Criar, editar e desativar serviços;
* Listar, editar e excluir clientes;
* Visualizar todos os chamados;
* Alterar o status dos chamados;
* Acompanhar os valores dos atendimentos.

Ao criar uma conta de técnico, o administrador define uma senha provisória, que poderá ser alterada posteriormente pelo próprio técnico.

Os serviços podem ser desativados sem serem excluídos permanentemente. Dessa forma, deixam de aparecer na criação de novos chamados, mas continuam vinculados aos chamados anteriores.

### Técnico

O técnico é responsável pela execução dos serviços solicitados pelos clientes.

Principais funcionalidades:

* Editar o próprio perfil;
* Adicionar uma imagem de perfil;
* Alterar sua senha;
* Visualizar os chamados atribuídos;
* Adicionar serviços adicionais;
* Iniciar um atendimento;
* Encerrar um atendimento;
* Atualizar o status dos chamados.

Quando o técnico inicia um atendimento, o chamado passa para o status `Em atendimento`.

Após a conclusão do serviço, o chamado pode ser alterado para `Encerrado`.

O técnico não possui permissão para criar chamados ou gerenciar contas de clientes.

### Cliente

O cliente utiliza a plataforma para solicitar atendimentos técnicos.

Principais funcionalidades:

* Criar uma conta;
* Editar o próprio perfil;
* Adicionar uma imagem de perfil;
* Excluir sua conta;
* Criar chamados;
* Selecionar serviços;
* Escolher um técnico disponível;
* Visualizar o histórico de chamados;
* Acompanhar o status e os valores dos atendimentos.

O cliente não pode alterar um chamado após sua criação.

Serviços adicionais somente podem ser incluídos pelo técnico responsável pelo atendimento.

Ao excluir sua conta, todos os chamados relacionados ao cliente também são removidos.

---

## Chamados

Um chamado representa a relação entre um cliente, um técnico e os serviços que serão realizados.

Cada chamado possui:

* Cliente solicitante;
* Técnico responsável;
* Serviço principal;
* Serviços adicionais;
* Valor individual de cada serviço;
* Valor total do atendimento;
* Data de criação;
* Status atual.

Os chamados podem possuir os seguintes status:

| Status           | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `Aberto`         | O chamado foi criado e aguarda atendimento |
| `Em atendimento` | O técnico iniciou o atendimento            |
| `Encerrado`      | O atendimento foi finalizado               |

O status pode ser atualizado pelo técnico responsável ou pelo administrador.

---

## Serviços

Os serviços representam as atividades que podem ser solicitadas pelos clientes.

Cada serviço possui:

* Nome;
* Descrição;
* Valor;
* Situação ativa ou inativa;
* Data de criação;
* Data de atualização.

Somente administradores podem criar, editar ou desativar serviços.

Exemplos de serviços disponíveis:

* Instalação e atualização de softwares;
* Instalação e atualização de hardwares;
* Diagnóstico e remoção de vírus;
* Suporte a impressoras;
* Suporte a periféricos;
* Solução de problemas de conexão;
* Backup e recuperação de dados;
* Otimização do sistema operacional;
* Configuração de VPN e acesso remoto.

---

## Funcionalidades

* Autenticação de usuários;
* Autorização baseada em perfil;
* Gerenciamento de técnicos;
* Gerenciamento de clientes;
* Gerenciamento de serviços;
* Criação e acompanhamento de chamados;
* Upload de imagem de perfil;
* Controle de disponibilidade dos técnicos;
* Atualização do status dos chamados;
* Inclusão de serviços adicionais;
* Cálculo automático do valor total;
* Histórico de chamados;
* Exclusão relacionada de clientes e chamados;
* Desativação de serviços;
* Interface responsiva;
* Consumo de API própria.

---

## Tecnologias

### Front-end

| Tecnologia   | Utilização                  |
| ------------ | --------------------------- |
| React        | Construção da interface     |
| TypeScript   | Tipagem estática            |
| Vite         | Ambiente de desenvolvimento |
| Tailwind CSS | Estilização                 |
| React Router | Gerenciamento de rotas      |
| Axios        | Comunicação com a API       |
| Zod          | Validação de dados          |

### Back-end

| Tecnologia     | Utilização               |
| -------------- | ------------------------ |
| Node.js        | Ambiente de execução     |
| Express        | Construção da API        |
| TypeScript     | Tipagem estática         |
| PostgreSQL     | Banco de dados           |
| Prisma ORM     | Comunicação com o banco  |
| Zod            | Validação de dados       |
| JSON Web Token | Autenticação             |
| Jest           | Testes automatizados     |
| Docker         | Padronização do ambiente |

---

## Arquitetura

O projeto foi dividido em duas aplicações:

```text
helpdesk/
├── frontend/
└── backend/
```

O front-end é responsável pela interface e pela interação do usuário com a plataforma.

O back-end é responsável pelas regras de negócio, autenticação, autorização, persistência dos dados e comunicação com o banco de dados.

---

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* [Node.js](https://nodejs.org/);
* [Git](https://git-scm.com/);
* [Docker](https://www.docker.com/);
* Docker Compose;
* PostgreSQL, caso o banco não seja executado com Docker.

---

## Executando o projeto

### 1. Clone os repositórios

```bash
git clone URL_DO_REPOSITORIO_FRONTEND
git clone URL_DO_REPOSITORIO_BACKEND
```

---

## Back-end

### 2. Acesse a pasta do back-end

```bash
cd backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do back-end:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/helpdesk?schema=public"

JWT_SECRET="sua-chave-secreta"
JWT_EXPIRES_IN="1d"

PORT=3333
```

Substitua os valores de acordo com a configuração do seu ambiente.

### 5. Inicie o banco de dados

Caso o projeto utilize Docker:

```bash
docker compose up -d
```

### 6. Execute as migrations

```bash
npx prisma migrate dev
```

### 7. Gere o Prisma Client

```bash
npx prisma generate
```

Caso o projeto possua um arquivo de seed:

```bash
npx prisma db seed
```

### 8. Inicie o servidor

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3333
```

---

## Front-end

### 9. Acesse a pasta do front-end

```bash
cd frontend
```

### 10. Instale as dependências

```bash
npm install
```

### 11. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do front-end:

```env
VITE_API_URL="http://localhost:3333"
```

### 12. Inicie a aplicação

```bash
npm run dev
```

O front-end estará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## Scripts do back-end

| Comando             | Descrição                            |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Inicia o servidor em desenvolvimento |
| `npm run build`     | Gera a versão de produção            |
| `npm run start`     | Inicia a versão de produção          |
| `npm run test`      | Executa os testes automatizados      |
| `npx prisma studio` | Abre a interface visual do Prisma    |

---

## Scripts do front-end

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o front-end em desenvolvimento    |
| `npm run build`   | Gera a versão otimizada para produção    |
| `npm run preview` | Executa uma prévia da versão de produção |
| `npm run lint`    | Executa a análise do código              |

---

## Autenticação

O sistema utiliza **JSON Web Token** para autenticação.

Após realizar o login, o usuário recebe um token que deve ser enviado nas requisições protegidas:

```http
Authorization: Bearer TOKEN_DO_USUARIO
```

As permissões são verificadas de acordo com o perfil do usuário:

```text
ADMIN
TECHNICIAN
CLIENT
```

---

## Regras de negócio

* Apenas administradores podem criar contas de técnicos;
* Apenas administradores podem criar, editar ou desativar serviços;
* Serviços inativos não aparecem na criação de novos chamados;
* Serviços inativos permanecem vinculados aos chamados anteriores;
* Técnicos só podem gerenciar chamados atribuídos a eles;
* Clientes só podem alterar informações da própria conta;
* Clientes não podem editar chamados após a criação;
* Todo chamado deve possuir pelo menos um serviço;
* Todo chamado deve possuir um técnico responsável;
* O valor total é calculado pela soma dos serviços;
* Ao excluir um cliente, seus chamados também são excluídos;
* Somente o administrador e o técnico responsável podem atualizar o status de um chamado.

---

## Responsividade

A interface foi desenvolvida seguindo a abordagem **Mobile First**, adaptando-se a diferentes tamanhos de tela:

* Celulares;
* Tablets;
* Notebooks;
* Monitores desktop.

---

## Testes

Os testes automatizados do back-end utilizam o Jest.

Para executar os testes:

```bash
npm run test
```

Para executar em modo de observação:

```bash
npm run test:watch
```

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

> Os comandos podem variar conforme os scripts configurados no arquivo `package.json`.

---

## Melhorias futuras

* Recuperação de senha por e-mail;
* Notificações em tempo real;
* Envio de e-mails sobre atualizações;
* Avaliação dos técnicos;
* Chat entre cliente e técnico;
* Filtros avançados;
* Dashboard com métricas;
* Exportação de relatórios;
* Exclusão ou desativação de técnicos;
* Paginação nas listagens;
* Histórico de alterações;
* Armazenamento externo de imagens;
* Documentação da API com Swagger.

---

## Autor

Desenvolvido por **Braian Nickolas**.

[GitHub](https://github.com/palhetabraian) | [LinkedIn](https://www.linkedin.com/in/braian-nickolas-4177a7295/)
