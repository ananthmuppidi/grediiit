FROM node:17-alpine

WORKDIR /frontend

ENV PATH=/frontend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install --force
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]