# Use a Node.js 14.x base image
FROM node:14

# Set working directory to /app
WORKDIR /app

# Clone the log-generator repository
RUN git clone https://github.com/kaumina/log-generator.git .

# Install dependencies
RUN npm install

# Create log directory
RUN mkdir -p /var/log/log-generator

# Set permissions for log directory
RUN chown -R node:node /var/log/log-generator

# Set user to non-root user
USER node

# Start the app
CMD [ "npm", "start" ]
