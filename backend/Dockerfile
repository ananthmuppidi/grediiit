FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /backend

ENV PATH=/backend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3500
CMD ["node", "server.js"]