FROM node:16-alpine

WORKDIR /app-backend

COPY package.json ./

RUN npm install --loglevel verbose

COPY ./ ./

CMD [ "npm", "run", "dev"]