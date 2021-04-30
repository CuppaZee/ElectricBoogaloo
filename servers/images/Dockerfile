FROM node:14-alpine

WORKDIR /usr/src/CuppaZeeImages

COPY package*.json ./

RUN yarn install --prod

COPY lib lib
COPY override override

EXPOSE 80
CMD [ "node", "lib/server.js" ]

