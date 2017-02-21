'use strict'

module.exports = (document, documentPath) => {
  const doc = {
    title: document.title,
    offTitle: document.offTitle,
    type: document.type,
    document: documentPath,
    distribution: document.distribution
  }
  if (document.distribution) {
    doc.filsti = documentPath
    doc.mimetype = 'application/pdf'
  }
  return doc
}
