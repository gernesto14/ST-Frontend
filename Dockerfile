# Use the official Node.js image.
FROM node:20-alpine

# # Create the app directory and set the appropriate permissions.
# RUN mkdir -p /app

# Set the working directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Switch to the node user.
# USER node



# Install dependencies.
RUN npm install --force

# # Copy local code to the container image.
# COPY --chown=node:node . .

# ✅ Copy all files, including .env, before building
COPY . .

# Build the Next.js application.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "start" ]

# # Set the user to use when running this image.
# USER 1000  # node