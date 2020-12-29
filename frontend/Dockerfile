FROM node:14.15.3

ENV TRACKR_PORT=${TRACKR_PORT:-8080}

ENV REACT_APP_API_URI=${REACT_APP_API_URI:-http://localhost:5000}

EXPOSE ${TRACKR_PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD serve -l ${TRACKR_PORT} -s build
