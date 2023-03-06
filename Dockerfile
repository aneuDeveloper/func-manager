FROM node:19.7-buster as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.23.3
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build/index.html index.html
EXPOSE 80
CMD ["/bin/sh" , "-c" , "envsubst < index.html > /usr/share/nginx/html/index.html && exec nginx -g 'daemon off;'"]