# Giai đoạn xây dựng
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn chạy
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./

# Cài đặt serve
RUN npm install -g serve

# Thêm kiểm tra sức khỏe
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Sử dụng người dùng không phải root
USER node

# Mở cổng
EXPOSE 3000

# Khởi động ứng dụng
CMD ["serve", "-s", "build", "-l", "3000"]