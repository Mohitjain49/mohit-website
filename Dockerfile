# This website uses Node Version 26.1.0
FROM node:26.1.0

# This is the root of this project.
WORKDIR /app

# Define and install the specific npm version
RUN npm install -g npm@11.15.0

# This copies both package.json AND package-lock.json.
COPY package*.json ./

# This runs "npm ci" to install the necessary dependencies.
RUN npm ci

# This copies the rest of the files into the container.
COPY . .

# This defines the port for the docker instance.
ENV port=5000

# Exposes "http://localhost:5000" so any laptop can use it.
EXPOSE 5000

# This opens the dev version of my website.
CMD ["npm", "run", "dev"]