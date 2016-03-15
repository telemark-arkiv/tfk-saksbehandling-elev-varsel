###########################################################
#
# Dockerfile for tfk-saksbehandling-elev-varsel
#
###########################################################

# Setting the base to nodejs 4.4.0
FROM mhart/alpine-node:4.4.0

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

# Env variables
ENV TFK_SEV_JWT_KEY NeverShareYourSecret
ENV TFK_SEV_CALLBACK_STATUS_MESSAGE Varselbrev produsert
ENV TFK_SEV_JOB_DIRECTORY_PATH test/data/jobs
ENV TFK_SEV_DISTRIBUTION_DIRECTORY_PATH test/data/distribution
ENV TFK_SEV_ARCHIVE_DIRECTORY_PATH test/data/archive
ENV TFK_SEV_DONE_DIRECTORY_PATH test/data/done
ENV TFK_SEV_ERROR_DIRECTORY_PATH test/data/errors

# Startup
ENTRYPOINT node example.js