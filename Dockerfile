# base image
FROM node:13.3.0-alpine3.10 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .

RUN npm install
RUN node rmdir.js
RUN npm run webpack-build
RUN node merger.js

FROM nginx:alpine as server

WORKDIR /home

COPY --from=build /app .

COPY nginx.conf /etc/nginx/

COPY ./public /usr/share/ngnix/html
RUN cp -a public/* /usr/share/ngnix/html

EXPOSE 3000

ENTRYPOINT ["nginx"]