FROM node:22-alpine

WORKDIR /app

COPY ./services/backend/package*.json ./

RUN npm install

COPY ./services/backend ./

COPY ./shared ./shared
COPY ./configs/tsconfig.base.json ./

CMD ["npm", "run", "start:dev", "--", "--host", "0.0.0.0"]

# docker build -t backend .
# docker run --name backend -p 3000:3000 backend
