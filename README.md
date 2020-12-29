# Trackr

WIP

## Deploying to production using nginx (or other webservers)

1. Checkout the code to your server

> Note: If you plan to host this app on a subdirectory such as www.example.com/myapp, you need to specify where the app is going to be hosted by adding the `homepage` option in `frontend/package.json`

> e.g. add `"homepage": "https://example.com/myapp/",`

2. Set your mongodb connection string in your MONGO_URI environment variable
3. Run `docker-compose build && docker-compose up -d`
4. Using nginx's proxy_pass you can now point nginx to serve both the frontend and backend (by default on ports 8080 and 5000)
