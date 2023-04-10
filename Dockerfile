FROM node:18-alpine

WORKDIR /contacts_app

COPY .package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3001

CMD ["node", "server"]

