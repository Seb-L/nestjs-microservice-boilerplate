FROM node:lts-alpine3.11
RUN mkdir -p /gateway
WORKDIR /gateway
ADD . /gateway
RUN yarn
CMD yarn start:dev
