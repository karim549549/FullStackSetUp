FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE  4000

CMD [ "node", "dist/main" ]