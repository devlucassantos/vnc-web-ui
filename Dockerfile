FROM node:20 AS build

ARG VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist
COPY --from=build /app/src/ui/web/assets /app/dist/src/ui/web/assets

CMD serve -s dist -l $PORT
