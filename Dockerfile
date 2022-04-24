FROM node

WORKDIR /usr/book-store

COPY . .

RUN npm install

CMD ["npm", "start"]