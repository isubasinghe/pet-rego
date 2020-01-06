# Documentation
Full documentation of the REST API is available through the endpoint /docs provided via Swagger and NestJS.

# How to get it up and running.
* Option 1: Docker
  Simply run `docker-compose up` 
* Option 2: 
  Manually setup a postgresql database listening to connections on port 5432
  Then modify the .env file provided to match your database config. 
  Then run yarn start
  
Both of these will start the service on localhost:3000

# Authentication
This entire project was built around the assumption that authentication would be
added via a provider like AWS cognito. The user create route could be called via a postConfirmation lambda.
We obviously have to secure this route first, in order to ensure only our lambda function is able to call it.
Note that when we add authentication we do not need the ownerId, we can retrieve it ourseleves via the JWT token.

# How to handle v2, supporting a local food supplier
In order to support the local food supplier we can create a new route in /v2 called /foodinfo 
The controller for this could then use the PetService in order to determine the pet type(s) an owner has and map to the appropriate food item.