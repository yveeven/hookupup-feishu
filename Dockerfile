FROM node:16-buster-slim

WORKDIR /app
COPY package*.json ./
ENV npm_config_registry=https://registry.npm.taobao.org
ENV PNPM_REGISTRY=https://registry.npm.taobao.org
RUN npm i -g pnpm
RUN pnpm install
COPY . .

CMD ["pnpm", "start"]