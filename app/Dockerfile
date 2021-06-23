FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install --save
ENV API_URL=api
RUN npm run build

FROM nginx:alpine
RUN mkdir /app
ENV API_URL=http://todo-api:8080
COPY --from=build /app/public /app
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY entrypoint.sh .
EXPOSE 80
ENTRYPOINT ["sh", "/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]