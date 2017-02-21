'use strict'

module.exports = (document) => {
  const doc = {
    title: document.title,
    offTitle: document.offTitle,
    type: document.type,
    document: document.documentFilepath,
    distribution: document.distribution
  }
  if (document.distribution) {
    doc.filsti = document.documentFilepath
    doc.mimetype = 'application/pdf'
  }
  return doc
}
