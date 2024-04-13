FROM alpine

RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install -g serve
COPY . .

ENV NODE_ENV=production
ENV IS_HOSTED=true

RUN npm run build
ENTRYPOINT serve dist -s -p 5173