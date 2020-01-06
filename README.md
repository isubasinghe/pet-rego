# Documentation
Full documentation of the REST API is available through the endpoint /docs provided via Swagger and NestJS.

# How to get it up and running.
* Option 1: Docker
  Simply run `docker-compose up` 
* Option 2: 
  Manually setup a postgresql database listening to connections on port 5432
  Then modify the .env file provided to match your database config. 
  Then run yarn start
  