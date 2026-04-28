FROM nginx:alpine

COPY docs-dist/ /usr/share/nginx/html/

RUN sed -i 's/listen       80;/listen       80;\n    gzip on;\n    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text\/javascript;/' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]