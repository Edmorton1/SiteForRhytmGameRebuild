FROM node:22-alpine

WORKDIR /app

COPY ./services/frontend/package*.json ./

RUN npm install

COPY ./services/frontend ./

COPY ./shared ./shared
COPY ./configs/tsconfig.base.json ./

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# docker build -t frontend .
# docker run --name frontned -p 5173:5173 frontend
