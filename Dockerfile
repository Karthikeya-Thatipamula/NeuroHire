# Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app
ENV PORT=3000
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
RUN npm install serve --no-save
CMD ["npx", "serve", "build/client", "-s", "-l", "tcp://0.0.0.0:3000"]