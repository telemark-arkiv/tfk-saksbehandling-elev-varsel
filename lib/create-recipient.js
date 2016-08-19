'use strict'

module.exports = person => {
  return {
    type: 'privatPerson',
    navn: person.NAVN,
    adresse1: person.ADR || '',
    adresse2: '',
    adresse3: '',
    postnr: person.POSTN,
    poststed: person.POSTS,
    fodselsnr: person.FODT.toString() + person.PERS.toString()
  }
}
