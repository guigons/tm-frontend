FROM node:lts-alpine

RUN mkdir -p /home/node/frontend && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY package*.json yarn.* ./

USER node 

RUN yarn

ENV PATH /home/node/frontend/node_modules/.bin:$PATH

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD ["yarn", "start:dev"]