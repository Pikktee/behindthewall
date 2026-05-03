FROM node:25-alpine

WORKDIR /app

COPY package.json ./
COPY server ./server

ENV NODE_ENV=production
ENV PORT=8787
ENV HOST=0.0.0.0

EXPOSE 8787

CMD ["node", "server/index.js"]
