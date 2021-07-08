FROM node:14-alpine

WORKDIR /usr/src/BouncerAlerts

COPY package*.json ./

RUN yarn install --prod

COPY lib lib

COPY *.sh ./

RUN chmod +x ./entrypoint.sh
RUN chmod +x ./run.sh

ENTRYPOINT [ "/usr/src/BouncerAlerts/entrypoint.sh" ]