FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim   
ENV NODE_ENV production
ENV PORT 3005
WORKDIR /app
COPY --from=builder /app/build /app
CMD ["node", "index.js"]
EXPOSE 3005