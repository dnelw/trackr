FROM node:14.15.3

ENV TRACKR_API_PORT=${TRACKR_API_PORT:-5000}

EXPOSE ${TRACKR_API_PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run start
