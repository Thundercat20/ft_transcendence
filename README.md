# ft_transcendence

## .env file
You need to create a .env file
```
POSTGRES_USER=transcendence
POSTGRES_PASSWORD=password
POSTGRES_DB=transcendence

DB_HOST=127.0.0.1
DB_PORT=5432

SESSION_SECRET=replace_with_a_random_secret_of_at_least_32_bytes
```

## db
```
docker compose up -d
```

## backend
### setting up
```
cd backend
npm install
npm run build
npx typeorm migration:run -d dist/database/data-source.js
```

Make sure `npm run build` run successfully and create `ist/database/data-source.js`

### start server
```
npm run start:dev
```

## frontend
### setting up
```
cd frontend
npm install
```

### start server
```
npm start
```