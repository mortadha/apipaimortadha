FROM nginx:1.13.3-alpine

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist /usr/share/nginx/html

RUN mkdir /usr/share/nginx/html/.well-known

RUN mkdir /usr/share/nginx/html/.well-known/pki-validation

COPY ./godaddy.html /usr/share/nginx/html/.well-known/pki-validation

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]