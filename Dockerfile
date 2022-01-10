FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8 && npm install

FROM node:14-alpine

WORKDIR /app

ENV PORT 8080

COPY . .
COPY --from=deps /app/node_modules ./node_modules

USER node

CMD ["npm", "start"]