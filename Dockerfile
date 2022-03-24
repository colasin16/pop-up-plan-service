from node:14.18.2 as base
WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install && \
    yarn cache clean
RUN useradd -m planner-user
RUN mkdir -p /var/planner/db
RUN mkdir -p /tmp/planner
RUN chown -R planner-user:planner-user /tmp/planner /var/planner/db
COPY --chown=planner-user:planner-user . .

FROM base as production
ENV NODE_PATH=./build
RUN yarn build:only
