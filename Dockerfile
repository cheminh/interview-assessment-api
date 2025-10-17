# pull official base image
FROM artifactory.manulife.ca/endorsed-docker/ets-node:22-debian12-1.1.2

#set node env as PRODUCTION
ENV NODE_ENV production

# set working directory
WORKDIR /usr/src/app

# copy .npmrc to get npm packages from Manulife Artifactory
COPY --chown=node:node .npmrc ./

# copy package.json and package-lock.json to get dependencies
COPY --chown=node:node package*.json ./

USER root

# install npm dependencies except dev dependencies
RUN npm ci --omit=dev

# clean up the npmrc file
RUN rm .npmrc

# copy source files
COPY --chown=node:node src ./src

#Run the process as node
USER node

# describe that the container is listening on port 3001
EXPOSE 4000

# start container with npm run start
CMD [ "npm", "run", "start" ]
