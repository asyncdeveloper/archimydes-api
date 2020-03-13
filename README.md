# Node.js Express API with TypeScript 
> A REST API which allows users create web stories and admin approves

## Description
This project was built in Node.js, Express, MySQL, TypeORM and TypeScript .

## Project Features

##### Authentication : 
- JWT Authentication

##### Story :
- Create Stories and View Stories based on Role
- Assign Stories to Admin
- Approve / Reject Stories

##### Integration testing :
- Jest (https://jestjs.io/)
- Supertest (https://www.npmjs.com/package/supertest)

## Project Scoping 
- An Admin can create and update stories
- A story can only have one reviewer and it must be an  admin
- Upon story creation the user needs to  assign the story to a desired Admin
- Two Roles are present on the system and automatically seeded - User / Admin
- ENUM were used for column values that will rarely change like 
   - ##### Story States [ 'APPROVED', 'REJECTED',  'WAITING_AUTHORIZATION']
   - ##### Story Types [ 'ENHANCEMENT', 'BUGFIX',  'DEVELOPMENT']

## Requirements
To run the API, you must install:
- **Node.js** (https://nodejs.org/en/download/)
- **MySQL** (https://dev.mysql.com/downloads/installer/)


## Running the API

Create an `.env` file using the command .You can use this config or change it for your purposes. 

```bash
cp .env.example .env
```

Install Dependencies

```
npm install
```

### Environment
Configure **development** object in **ormconfig.json** for dev environment based on your MYSQL database configuration

```  
"name": "development",  
"host": "localhost",
"port": <YOUR_MYSQL_PORT>,
"username": "<YOUR_MYSQL_USERNAME>",
"password": "<YOUR_DB_PASSWORD>",
"database": "<YOUR_DB_NAME>",
```

Configure **test** object in **ormconfig.json** for testing environment based on your MYSQL database configuration

```  
"name": "test",  
"host": "localhost",
"port": <YOUR_MYSQL_PORT>,
"username": "<YOUR_MYSQL_USERNAME>",
"password": "<YOUR_DB_PASSWORD>",
"database": "<YOUR_DB_NAME>",
```

Configure **production** object in **ormconfig.json** for production environment based on your MYSQL database configuration

```  
"name": "production",  
"host": "localhost",
"port": <YOUR_MYSQL_PORT>,
"username": "<YOUR_MYSQL_USERNAME>",
"password": "<YOUR_DB_PASSWORD>",
"database": "<YOUR_DB_NAME>",
```

After setting up Database connection, setup database migrations using
```
npm migration:run
```

Start the application in dev env:

```
npm run dev
```

Express server listening on http://localhost:3001/, in development mode

The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.


## Testing 
To run integration tests: 
```bash
npm test
```

## Production Build
To generate a production build and start production server:
 
```bash
npm prod
```

## Swagger
Swagger documentation will be available on route: 
```bash
http://localhost:3001/docs
```
