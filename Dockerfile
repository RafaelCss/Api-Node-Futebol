FROM node:18.12.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g npm@9.4.1
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]