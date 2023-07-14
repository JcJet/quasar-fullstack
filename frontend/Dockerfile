FROM node:20-alpine as develop-stage

WORKDIR /app

COPY package*.json ./

RUN npm i -g @quasar/cli

COPY . .

EXPOSE 8080

