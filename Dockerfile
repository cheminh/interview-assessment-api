# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /usr/src/app

# copy .npmrc to get npm packages from Manulife Artifactory
COPY .npmrc ./

# copy package.json and package-lock.json to get dependencies
COPY package*.json ./

# install npm dependencies
RUN npm ci

# clean up the npmrc file
RUN rm .npmrc

# copy source files
COPY src ./src

# describe that the container is listening on port 3001
EXPOSE 4000

# start container with npm run start
CMD [ "npm", "run", "start" ]
