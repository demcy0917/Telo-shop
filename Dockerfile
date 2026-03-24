FROM node:20-alpine

# Instala dependencias necesarias para bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app

RUN yarn global add rimraf @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && ls -la dist

EXPOSE 3000

CMD ["node", "dist/main.js"]