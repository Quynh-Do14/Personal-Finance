# Run stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./

# Install serve
RUN npm install -g serve

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Use non-root user for security
USER node

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]