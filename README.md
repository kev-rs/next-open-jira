# Next.js OpenJira App
To run locally, it needs the database
```
docker-compose up -d
```
* -d → __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Config the enviroment variables
Rename file __.env.template__ to __.env__

## Populate the db with test info

Call:
```
http://localhost:3000/seed
```