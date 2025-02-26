# Base image for build stage
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (leverages caching)
COPY package*.json ./

# Install only production dependencies
ENV NODE_ENV=production
RUN npm install --only=production

# Copy application code
COPY . .

# Copy wait-for-it.sh to the correct location
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Use a smaller base image for final production image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app /app

# Install curl efficiently & remove unnecessary package lists
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Install curl for health check
RUN apt-get update && apt-get install -y curl

# Set non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Set environment variables
ENV PORT=4444
EXPOSE 4444
ENV HOST=localhost

# Start application
CMD ["npm", "run", "start"]
