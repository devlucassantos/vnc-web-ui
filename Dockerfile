FROM node:20 AS build

ARG VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/src/ui/web/assets /usr/share/nginx/html/src/ui/web/assets

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
