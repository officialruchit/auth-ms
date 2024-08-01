FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3333
EXPOSE 3333
CMD [ "npx","ts-node-dev src/index.ts" ]