FROM node:14.5
WORKDIR /app
COPY . .
RUN CI=true
RUN npm install
EXPOSE 3000

CMD ["npm", "start"]