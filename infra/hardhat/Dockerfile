FROM node:22.12.0-alpine

ARG APP_PATH=../web3

WORKDIR /web3

COPY $APP_PATH .

RUN npm install

CMD ["npx", "hardhat", "node"]