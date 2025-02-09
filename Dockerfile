FROM node:20.18.2-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port (change if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
