# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Production stage
FROM node:18-slim

# Set the working directory inside the production image
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (optional, or pass in via Docker command)
ENV NODE_ENV=production

# Run the application
CMD ["node", "index.js"]
