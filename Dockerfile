FROM node:14.17.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

EXPOSE 8081

CMD yarn start

