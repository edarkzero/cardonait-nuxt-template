FROM node:14-alpine as base
ENV PORT=3000
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["npm","run", "build"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nuxt@2.13.0 && npm install
COPY . .
CMD ["npm","run", "start"]
