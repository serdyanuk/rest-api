# This is simple project for learning node.js and REST API with jsdoc swagger documentation

**Instruction:**

create .env file in project root:
  
```
NODE_ENV=development
PG_USER=<user>
PG_DB=<db>
PG_PASSWORD=<password>
PG_HOST=postgres
JWT_SECRET_KEY=secret
```
run command: 
```
docker-compose up -d
```
open in browser:
```
localhost:3000/api-docs // swagger api documentation
```

**Requirements for running:** Node.js 14+, docker && docker-compose
