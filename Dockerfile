###
# BUILD FOR LOCAL DEVELOPMENT
###

# base image
FROM node:16.19.1-alpine As development

# create app directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# install app dependencies
RUN npm clean-install

# copy app source
COPY --chown=node:node . .

# use the "node" user instead of "root"
USER node

###
# BUILD FOR PRODUCTION
### 


# base image
FROM node:16.19.1-alpine As build

# create app directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# 'npm run build' requires the  'node_modules'
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# copy app source
COPY --chown=node:node . .

# build the application to the "dist" directory; requires all dependencies
RUN npm run build

# optimize node for production
ENV NODE_ENV production

# optimize the node_modules directory to contain only those required to run the app
RUN npm clean-install --only=production && npm cache clean --force

# use the "node" user instead of "root"
USER node

###
# PRODUCTION
###

FROM node:16.19.1-alpine as production

# copy build artifacts from build stage
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# start the app
CMD ["node", "dist/main.js"]