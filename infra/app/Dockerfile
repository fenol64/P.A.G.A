FROM node:22.12.0-alpine

ARG APP_PATH=../app

WORKDIR /app

COPY $APP_PATH .

RUN npm install && npm run build

CMD ["npm", "run", "start"]