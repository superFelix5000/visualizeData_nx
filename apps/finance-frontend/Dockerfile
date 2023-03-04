#TODO: FIX THIS TO WORK IN THE MONOREPO CONTEXT

FROM node:16 as build

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@14.2.1
COPY . /app
RUN ng build --output-path=dist

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]