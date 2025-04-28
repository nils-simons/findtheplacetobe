FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3455

EXPOSE 3455

CMD ["node", "index.js"]