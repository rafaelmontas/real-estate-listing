FROM node:12
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
EXPOSE 5000
