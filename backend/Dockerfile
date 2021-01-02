FROM node:14.15.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run start
