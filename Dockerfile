# Step 1: Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files from src directory
COPY package*.json ./
RUN npm install

# Copy only the src directory for build
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]