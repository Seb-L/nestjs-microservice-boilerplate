FROM node:lts-alpine3.11
RUN mkdir -p /mailer
WORKDIR /mailer
ADD . /mailer
RUN yarn
CMD yarn start:dev
