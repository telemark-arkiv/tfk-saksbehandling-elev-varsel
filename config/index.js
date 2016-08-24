'use strict'

module.exports = {
  JWT_KEY: process.env.TFK_SEV_JWT_KEY || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_SEV_CALLBACK_STATUS_MESSAGE || 'Varselbrev produsert',
  JOB_DIRECTORY_PATH: process.env.TFK_SEV_JOB_DIRECTORY_PATH || 'test/data/jobs',
  DISTRIBUTION_DIRECTORY_PATH: process.env.TFK_SEV_DISTRIBUTION_DIRECTORY_PATH || 'test/data/distribution',
  ARCHIVE_DIRECTORY_PATH: process.env.TFK_SEV_ARCHIVE_DIRECTORY_PATH || 'test/data/archive',
  DONE_DIRECTORY_PATH: process.env.TFK_SEV_DONE_DIRECTORY_PATH || 'test/data/done',
  ERROR_DIRECTORY_PATH: process.env.TFK_SEV_ERROR_DIRECTORY_PATH || 'test/data/errors',
  PDF_SERVICE_URL: process.env.TFK_SEV_PDF_SERVICE_URL || 'https://pdftemplater.service.t-fk.no/',
  DSF_URL: process.env.TFK_SEV_DSF_URL || 'http://ws-test.infotorg.no/xml/ErgoGroup/DetSentraleFolkeregister1_4/2015-08-10/DetSentraleFolkeregister1_4.wsdl',
  DSF_NAMESPACE: process.env.TFK_SEV_DSF_NAMESPACE || 'http://ws.infotorg.no/xml/Admin/Brukersesjon/2006-07-07/Brukersesjon.xsd',
  DSF_USERNAME: process.env.TFK_SEV_DSF_USERNAME || 'MrSmith',
  DSF_PASSWORD: process.env.TFK_SEV_DSF_PASSWORD || 'MrSmithsPassword',
  DSF_METHOD: process.env.TFK_SEV_DSF_METHOD || 'hentForeldre',
  DSF_SAKSREF: process.env.TFK_SEV_DSF_SAKSREF || 'MinElev',
  P360WS_BASEURL: process.env.TFK_SEV_P360WS_BASEURL || 'http://tfk-fh-siweb01.login.top.no:8088/SI.WS.Core/SIF/',
  P360WS_USER: process.env.TFK_SEV_P360WS_USER || 'domain/username',
  P360WS_PASSWORD: process.env.TFK_SEV_P360WS_PASSWORD || 'password'
}
