1. Запустите Postgres Container
docker run --rm --publish 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=databasename postgres

sudo ss -lptn 'sport = :5432' // Определить PID процесса, занявшего порт
kill <pid> // Завершить процесс с указанным PID

2. npm i -D prisma
   npm i @prisma/client //автоматически вызывается команда install, prisma generate которая считывает вашу схему Prisma и генерирует версию Prisma Client, адаптированную к вашим моделям.
   npx prisma init
   prisma generate //вводится в консоль дословно (без npm). generate по умолчанию вызывается под капотом после запуска prisma migrate dev.
3. Отредактировать DATABASE_URL в .env:
заменить
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
на
   DATABASE_URL="postgresql://postgres@localhost:5432/databasename?schema=public"
т.к. командой в п.1 создана БД с именем databasename, имя пользователя БД по умолчанию -  postgres, а пароль не задан.
4. Создать схему БД prisma
5. Выполнить начальную миграцию
   npx prisma migrate dev --name init
   Для выполнения команды prisma migrate dev или prisma migrate reset без seed ("посева"),
вы можете передать флаг --skip-seed.
   Всякий раз, когда вы обновляете свою схему Prisma, вам придется обновлять схему базы данных,
используя либо prisma migrate dev, либо prisma db push.
Это позволит синхронизировать схему базы данных со схемой Prisma.
Команды также восстановят Prisma Client.
6. Отредактировать package.json, чтобы при каждой сборке production-версии проекта определения типов prisma 
   генерировались заново. Это требуется, т.к. определения типов prisma хранятся в папке node_modules.
   "scripts": {
   ...
   "build": "prisma generate && next build",
   ...
}
Это гарантирует отсутствие ошибок при ...
7. Для корректной работы seeding ("посева") установить пакет Typescript-Node
   npm i -D ts-node
8. Добавить в package.json свойство
   "prisma": {
   "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
   },
чтобы указать имя файла, который будет запускать ts-node при "посеве".
9. Создать файл seed.ts в @/prisma
в котором будут описаны действия, которые будут выполняться после обновления (миграции) или сброса БД.
10. Эту команду следует выполнять при первичном заполнении БД, после миграции, сброса БД.
Выполнить "посев" (seeding) БД:
   npx prisma db seed
11. Чтобы приложение не создавало новое подключение к БД при каждом запросе,
воспользуемся паттерном Singletone.
Создадим @lib/prisma.ts (инициализируем Prisma Client)
    https://codevoweb.com/how-to-setup-prisma-orm-in-nextjs-13-app-directory/
После этого для использования Prisma Client достаточно выполнить импорт:
 import { prisma } from "@/lib/prisma";
Это позволит избежать создания лишних подключений к БД.
12. Чтобы изменения, внесённые в БД сохранялись после остановки контейнера Docker,
нужно создать файл docker-compose.yml:
    version: "3.8"
    services:
    postgres:
    image: postgres:latest
    restart: always
    environment:
   - POSTGRES_USER=postgres
   - POSTGRES_PASSWORD=postgres_password
     volumes:
   - postgres:/var/lib/postgresql/data
     ports:
   - "5432:5432"
     volumes:
     postgres:
13. Добавить пароль имя пользователя БД в .env:
    DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/databasename?schema=public"
где postgres:postgres_password - db_user:db_password
14. Отредактировать в package.json скрипт "dev":
заменить действия на
    "dev": "docker-compose up && next dev",

******************************************************************************
Если при запуске Docker Compose вы получаете:

PostgreSQL Database directory appears to contain a database; Skipping initialization
вам необходимо предварительно удалить тома, которые были настроены для хранения базы данных.

Команда docker-compose down не выполняет это автоматически.
Вы можете запросить удаление томов следующим образом:

docker-compose down --volumes

******************************************************************************
При первом запуске контейнера:

npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

******************************************************************************
Устарело:

Prisma Docker

prismagraphql/prisma

https://v1.prisma.io/docs/1.34/prisma-server/deployment-environments/docker-rty1/

******************************************************************************
Dockerize NextJS Application with Prisma

Prisma в Docker

Dockerfile
# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN npm install

RUN npm install @prisma/client

COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
# start app
RUN npm run build
EXPOSE 3000
CMD npm run start


docker-compose.yaml

version: "3"

services:
web:
build:
context: .
dockerfile: Dockerfile
container_name: web
restart: always
volumes:
- ./:/usr/src/app
ports:
- "3000:3000"
env_file:
- .env

https://stackoverflow.com/questions/70684374/dockerize-nextjs-application-with-prisma

******************************************************************************
Начальный шаблон для NestJS 😻 включает GraphQL с клиентом Prisma, аутентификацию Passport-JWT

https://github.com/notiz-dev/nestjs-prisma-starter/blob/nest-8-prisma-3/README.md


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
