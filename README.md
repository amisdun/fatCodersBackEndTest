# fatCodersBackEndTest
## Project setup
``` 
Clone the repo
Create a .env file in the root of backend path /fatCodersBackEndTest/.env 
In the .env file you will need the following variables in other to run the project

POSTGRES_USER=user
POSTGRES_DB=fatcoders
POSTGRES_PASSWORD=password
POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_HOST=172.20.0.1
```
### Running app
```
Run the following commands to start the up
``` sudo docker-compose up --build ```
 1. Open your web browser and type http://localhost:8081/ to see the application
```
### Lints and Bug fixes 
```
yarn run lint:fix
```
