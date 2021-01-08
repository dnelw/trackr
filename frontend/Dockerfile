FROM node:14.15.4

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD serve -l 8080 -s build
