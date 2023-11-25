FROM node:19-alpine

WORKDIR /app/next-js

EXPOSE 5122

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
