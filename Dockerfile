###########################################################
#
# Dockerfile for tfk-saksbehandling-elev-varsel
#
###########################################################

# Setting the base to nodejs 4.7.2
FROM node:4.7.2-alpine

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node example.js