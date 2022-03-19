from node:14.18.2 as base
WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install && \
    yarn cache clean
COPY . .

FROM base as production
ENV NODE_PATH=./build
RUN yarn build:only
