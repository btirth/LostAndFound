FROM node:14

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:prod

EXPOSE 3000

CMD [ "npm", "start:prod" ]