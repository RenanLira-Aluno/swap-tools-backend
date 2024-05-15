# Api Swap Tools

## Requisitos

- Docker
- NodeJs >= 20

## Instalação

```bash
  git clone git@github.com:RenanLira-Aluno/swap-tools-backend.git
  cd swap-tools-backend

  npm install

```

## Configurações

- ### `swap-tools-firebase-admin.json`

	Colar arquivo de configuração enviado no grupo do zap zap em `libs/firebase/src/swap-tools-firebase-admin.json`.

- ### `docker-compose.yml`

	Se necessário alterar a porta do banco de dados

	> O mesmo deve ser feito em `libs/database/database.module.ts`.

## Para Rodar o Projeto

```bash
  docker compose -f ./docker-compose.yml -d
  npm run start # or npm run start:dev
```
