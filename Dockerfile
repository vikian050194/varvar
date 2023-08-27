# Use the official image as a parent image.
FROM node:16.20.0-buster-slim

# Set the working directory.
WORKDIR /usr/src/app

# Expose env variable
ENV PORT=8080

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE ${PORT}

# Copy app's source code from host to image filesystem.
COPY ./src/app.js .

# Run the specified command within the container.
ENTRYPOINT [ "node", "app.js" ]