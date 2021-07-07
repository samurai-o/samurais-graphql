## 环境创建阶段及安装缓存
FROM node:latest as builder
LABEL author lemonpaimc
RUN mkdir -p /home/node/samurais
WORKDIR /home/node/samurais
COPY package.json ./
RUN npm install

# RUN pm2 install pm2-webshell
# RUN pm2 conf pm2-webshell:username lemonpaimc@163.com
# RUN pm2 conf pm2-webshell:password mcfth0519

FROM node:latest

ARG PM2_KEY
ARG PM2_ID
ENV PM2_KEY ${PM2_KEY}
ENV PM2_ID ${PM2_ID}

WORKDIR /home/node/samurais
RUN mkdir -p /home/node/samurais/env
RUN mkdir -p /home/node/samurais/prisma

RUN npm install -g pm2@latest
COPY package.json ./
COPY --from=builder /home/node/samurais/node_modules ./node_modules
COPY . /home/node/samurais
RUN pm2 link $PM2_KEY $PM2_ID
RUN npm run prisma:generate
RUN npm run build
VOLUME [ "/home/node/samurais/env",  "/home/node/samurais/prisma"]
EXPOSE 4001
EXPOSE 4005
EXPOSE 4006

CMD [ "pm2-runtime", "ecosystem.config.js" ];


