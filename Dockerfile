FROM node:18-alpine3.15

RUN npm i -g @nestjs/cli@9.0.0

USER node 

WORKDIR /home/node/app