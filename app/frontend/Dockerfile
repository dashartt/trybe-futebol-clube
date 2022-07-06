FROM node:16-alpine

WORKDIR /app-frontend

COPY package.json ./

RUN npm install --loglevel verbose

COPY ./ ./

CMD [ "npm", "start"]