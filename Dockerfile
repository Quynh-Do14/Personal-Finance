# Stage 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json và cài đặt dependencies trước
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng React
RUN yarn build

# Stage 2: Serve React với Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Xóa file mặc định của Nginx
RUN rm -rf ./*

# Copy file build từ stage 1 sang stage 2
COPY --from=builder /app/build .

# Copy cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng chạy React
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
