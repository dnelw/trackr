# Trackr

A minimalistic weight and habits tracker.


## How to self host

1. Checkout the code to your server

2. The app uses Auth0 for authentication so you have to set the following environment variables in ./frontend/.env.production (read more about this [here](https://auth0.com/blog/complete-guide-to-react-user-authentication/)) Note: Auth0 is free up to 7000 active users

```
REACT_APP_API_URI=https://PATH_TO_API/
REACT_APP_AUTH0_DOMAIN=yoururl.xx.auth0.com
REACT_APP_AUTH0_CLIENT_ID=YOUR_APP_CLIENT_ID
REACT_APP_AUTH0_AUDIENCE=https://PATH_TO_AUDIENCE/
```

3. The app uses MongoDB as a backend. Set the following environment variables in ./backend/.env.production

```
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
CLIENT_ORIGIN_URL=URL_API_IS_HOSTED_ON
AUTH0_AUDIENCE=https://PATH_TO_AUDIENCE/
AUTH0_DOMAIN=yoururl.xx.auth0.com
```

4. Run `docker-compose build && docker-compose up -d`

5. You can serve this directly (frontend and backend ports default to 8080 and 8079 respectively) or stick a reverse proxy like nginx in front of your server
