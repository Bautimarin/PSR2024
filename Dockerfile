# Etapa de Buildeo
FROM node:lts as build
#
WORKDIR /app

COPY ../../ .

RUN npm install

RUN npm run build

# Etapa de Producción
FROM node:lts as production

WORKDIR /app

COPY --from=build /app/dist /app/dist

EXPOSE 80

CMD ["npx", "http-server", "dist/app"]