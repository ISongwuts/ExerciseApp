FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . ./

ENV user='avnadmin' \
    host='exercise-app-exercise-app.a.aivencloud.com' \
    password='ice1230!' \
    database='exercise_app' \
    port=27440 \
    jwt_secret='isongwut.me'

EXPOSE 8000

CMD ["npm", "start"]
