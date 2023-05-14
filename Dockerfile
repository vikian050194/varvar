# Use the official image as a parent image.
FROM node:16.20.0-buster-slim

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

ENV NODE_ENV=production
ENV PORT=8080

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE ${PORT}

# Run the specified command within the container.
CMD [ "npm", "start" ]
# ENTRYPOINT [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .