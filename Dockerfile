FROM node:lts-alpine3.14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install app dependencies
#RUN npm install yarn -g

RUN yarn install

# Building Application
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn" , "production" ]
