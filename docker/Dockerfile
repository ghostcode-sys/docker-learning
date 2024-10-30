FROM node

WORKDIR /var/www/myapp

COPY ../ .

CMD [ "/bin/bash", "-c", "npm i ." ]

ENTRYPOINT [ "/bin/bash", "-c", "npm start" ]