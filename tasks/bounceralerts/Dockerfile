FROM node:14-alpine

WORKDIR /usr/src/BouncerAlerts

COPY package*.json ./

RUN yarn install --prod

COPY lib lib