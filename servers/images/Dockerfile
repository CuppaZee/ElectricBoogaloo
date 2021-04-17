FROM node:12-alpine

WORKDIR /usr/src/CuppaZeeImages

COPY package*.json ./

RUN yarn install --prod

COPY . .

EXPOSE 80
CMD [ "node", "lib/server.js" ]

