'use strict'

var config = {
  JWT_KEY: process.env.TFK_SEV_JWT_KEY || 'NeverShareYourSecret',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_SEV_CALLBACK_STATUS_MESSAGE || 'Varselbrev produsert',
  JOB_DIRECTORY_PATH: process.env.TFK_SEV_JOB_DIRECTORY_PATH || 'test/data/jobs',
  DISTRIBUTION_DIRECTORY_PATH: process.env.TFK_SEV_DISTRIBUTION_DIRECTORY_PATH || 'test/data/distribution',
  ARCHIVE_DIRECTORY_PATH: process.env.TFK_SEV_ARCHIVE_DIRECTORY_PATH || 'test/data/archive',
  DONE_DIRECTORY_PATH: process.env.TFK_SEV_DONE_DIRECTORY_PATH || 'test/data/done',
  ERROR_DIRECTORY_PATH: process.env.TFK_SEV_ERROR_DIRECTORY_PATH || 'test/data/errors'
}

module.exports = config
