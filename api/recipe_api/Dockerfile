FROM node:16-alpine as builder

WORKDIR /src
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install 

FROM node:16-alpine

ENV PORT=3000

EXPOSE $PORT

CMD [ "npm", "start" ]

WORKDIR /usr/src/app
COPY --from=builder /src/node_modules/ /usr/src/app/node_modules

COPY . /usr/src/app

RUN npm run build