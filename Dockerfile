FROM node:16

WORKDIR /user/src/app

COPY . .

RUN yarn install

CMD ["yarn","install","start:dev"]

