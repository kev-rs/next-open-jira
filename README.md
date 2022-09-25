# Next.js OpenJira App
## Install node modules
```
npm install
```
To run locally, it needs the database
```
docker-compose up -d
```
* -d → __detached__

* MongoDB URL Local:
```
mongodb://mongo1:30001/entriesdb
mongodb://mongo2:30002/entriesdb
mongodb://mongo3:30003/entriesdb
```

## Config the enviroment variables
Rename file __.env.template__ to __.env__

## Populate the db with test info

Run:
```
npx prisma db seed
```