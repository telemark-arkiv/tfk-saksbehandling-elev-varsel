###########################################################
#
# Dockerfile for tfk-saksbehandling-elev-varsel
#
###########################################################

# Setting the base to nodejs 4.6.0
FROM mhart/alpine-node:4.6.0

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
ENV TFK_SEV_JWT_KEY Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
ENV TFK_SEV_CALLBACK_STATUS_MESSAGE Varselbrev produsert
ENV TFK_SEV_JOB_DIRECTORY_PATH test/data/jobs
ENV TFK_SEV_DISTRIBUTION_DIRECTORY_PATH test/data/distribution
ENV TFK_SEV_ARCHIVE_DIRECTORY_PATH test/data/archive
ENV TFK_SEV_DONE_DIRECTORY_PATH test/data/done
ENV TFK_SEV_ERROR_DIRECTORY_PATH test/data/errors
ENV TFK_SEV_PDF_SERVICE_URL https://pdftemplater.service.t-fk.no
ENV TFK_SEV_DSF_URL http://ws-test.infotorg.no/xml/ErgoGroup/DetSentraleFolkeregister1_4/2015-08-10/DetSentraleFolkeregister1_4.wsdl
ENV TFK_SEV_DSF_NAMESPACE http://ws.infotorg.no/xml/Admin/Brukersesjon/2006-07-07/Brukersesjon.xsd
ENV TFK_SEV_DSF_USERNAME MrSmith
ENV TFK_SEV_DSF_PASSWORD MrSmithsPassword
ENV TFK_SEV_DSF_METHOD hentForeldre
ENV TFK_SEV_DSF_SAKSREF MinElev
ENV TFK_SEV_P360WS_BASEURL http://tfk-fh-siweb01.login.top.no:8088/SI.WS.Core/SIF/
ENV TFK_SEV_P360WS_USER domain/username
ENV TFK_SEV_P360WS_PASSWORD password

# Startup
ENTRYPOINT node example.js