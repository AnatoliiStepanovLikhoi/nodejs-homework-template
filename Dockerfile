FROM node:16

WORKDIR /contacts_app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3001

CMD ["node", "server"]

