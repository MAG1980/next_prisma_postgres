1. Запустите Postgres Container
docker run --rm --publish 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=databasename postgres

sudo ss -lptn 'sport = :5432' // Определить PID процесса, занявшего порт
kill <pid> // Завершить процесс с указанным PID

2. npm i -D prisma
   npm i @prisma/client
   npx prisma init
   prisma generate //вводится в консоль дословно (без npm)
3. Отредактировать DATABASE_URL в .env:
заменить
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
на
   DATABASE_URL="postgresql://postgres@localhost:5432/databasename?schema=public"
т.к. командой в п.1 создана БД с именем databasename, имя пользователя БД по умолчанию -  postgres, а пароль не задан.
4. Создать схему БД prisma
5. Выполнить начальную миграцию
   npx prisma migrate dev --name init
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
