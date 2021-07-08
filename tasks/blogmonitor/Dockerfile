FROM node:14-alpine

WORKDIR /usr/src/BlogMonitor

COPY package*.json ./

RUN yarn install --prod

COPY lib lib

COPY *.sh ./

RUN chmod +x ./entrypoint.sh
RUN chmod +x ./run.sh

ENTRYPOINT [ "/usr/src/BlogMonitor/entrypoint.sh" ]