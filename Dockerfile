## 环境创建阶段及安装缓存
FROM node:latest as builder
LABEL author lemonpaimc

ARG PM2_KEY
ARG PM2_ID
ENV PM2_KEY ${PM2_KEY}
ENV PM2_ID ${PM2_ID}

RUN npm install -g pm2@latest
# RUN pm2 install pm2-webshell
# RUN pm2 conf pm2-webshell:username lemonpaimc@163.com
# RUN pm2 conf pm2-webshell:password mcfth0519
RUN mkdir -p /home/node/samurais

WORKDIR /home/node/samurais
COPY . /home/node/samurais
RUN pm2 link $PM2_KEY $PM2_ID
RUN npm install
RUN mkdir -p /home/node/samurais/env
RUN mkdir -p /home/node/samurais/prisma
RUN npm run build
VOLUME [ "/home/node/samurais/env",  "/home/node/samurais/prisma"]
EXPOSE 4001
EXPOSE 4005

CMD [ "pm2-runtime", "ecosystem.config.js" ];


