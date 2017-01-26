###########################################################
#
# Dockerfile for tfk-saksbehandling-elev-varsel
#
###########################################################

# Setting the base to nodejs 6.9.4
FROM node:6.9.4-alpine

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