# etapa de compilación
FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN npm install
COPY . .
RUN npm run build

# etapa de producción
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
