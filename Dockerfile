FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


FROM nginx:alpine
RUN mkdir -p  /run
COPY --from=build /app/build /run
COPY nginx.conf /etc/nginx/nginx.conf
