# Monta uma imagem do backend com Node.jse instala dependencias para iniciar a APi

FROM node:20.20.2-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm install

COPY . .

WORKDIR /app/apps/backend

EXPOSE 3333

CMD ["npm", "run", "dev"]