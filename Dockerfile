FROM node:20.13.1-alpine3.20
WORKDIR /app
COPY . .
RUN npm install
ENV DATABASE_HOST "postgres"
ENV PORT 3000
CMD [ "npm", "run", "dev" ]