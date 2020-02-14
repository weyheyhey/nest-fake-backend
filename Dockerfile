FROM node:12.15
RUN mkdir /app
WORKDIR /app
COPY ./ ./
ARG NPM_TOKEN
ARG NPM_EMAIL
RUN npm set _auth "$NPM_TOKEN" && \
    npm set email "$NPM_EMAIL" && \
    npm set always-auth true && \
    npm set unsafe-perm true
RUN npm ci && \
    npm install && \
    npm run build

CMD ["npm", "run", "start:prod"]
