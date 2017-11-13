# Use an official Python runtime as a parent image
FROM node:boron

# Set the working directory to /app
WORKDIR /opt/www/grow/sensors

# Copy the current directory contents into the container at /app
COPY package.json package-lock.json ./

RUN npm install
COPY . ./

# Make port 80 available to the world outside this container
EXPOSE 8080
ENV PORT 8080
# Define environment variable
ENV NAME World
ENV NVM_VERSION v0.33.6
ENV NODE_VERSION 6.11.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash
# install node and npm
RUN bash -i -c 'nvm install $NODE_VERSION'; 
RUN bash -i -c 'nvm alias default $NODE_VERSION';
RUN bash -i -c 'nvm use default';

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN node -v
RUN npm -v
# Run app.py when the container launches
CMD ["npm", "start"]
