# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```


2. instalar prisma
```
npm install prisma
```

3. inicial el cliente de prisma
```
npx prisma init
```

4. crear el string de conexion de la env DATABASE_URL con:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

5. levantada la base de datos correr el siguiente comando para que el Modelo se refleje en POSTGRES:
```
npx prisma migrate dev
```

6. y para finalizar con Prisma, debemos generar el cliente para poder trabajar con el con:
```
npx prisma generate
```



