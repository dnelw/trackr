# Trackr

## Deploying to production using nginx (or other webservers)

1. Checkout the code to your server

> Note: If you plan to host this app on a subdirectory such as www.example.com/myapp, you need to specify where the app is going to be hosted by adding the `homepage` option in `frontend/package.json`

> e.g. add `"homepage": "https://example.com/myapp/",`

2. Set the following environment variables in ./frontend/.env.production (read more about this [here](https://auth0.com/blog/complete-guide-to-react-user-authentication/))

```
REACT_APP_API_URI=https://PATH_TO_API/
REACT_APP_AUTH0_DOMAIN=yoururl.xx.auth0.com
REACT_APP_AUTH0_CLIENT_ID=YOUR_APP_CLIENT_ID
REACT_APP_AUTH0_AUDIENCE=https://PATH_TO_AUDIENCE/
```

3. Set the following environment variables in ./backend/.env

```
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
CLIENT_ORIGIN_URL=URL_API_IS_HOSTED_ON
AUTH0_AUDIENCE=https://PATH_TO_AUDIENCE/
AUTH0_DOMAIN=yoururl.xx.auth0.com
```

4. Run `docker-compose build && docker-compose up -d`

5. Using nginx's proxy_pass you can now point nginx to serve both the frontend and backend (by default on ports 8080 and 5000)
