'use strict'

const STORAGE_KEY = 'memeDB'

var gMemes

function initSavedService() {
  gMemes = loadFromStorage(STORAGE_KEY) ?? []

  return gMemes
}

function getMemes() {
  return gMemes
}

function removeMeme(memeId) {
  const memeIdx = gMemes.findIndex(meme => memeId === meme.id)
  gMemes.splice(memeIdx, 1)

  _saveMemesToStorage()
}

function addMeme(imgData) {
  var meme = _createMeme(imgData)
  gMemes.unshift(meme)

  _saveMemesToStorage()
  return meme
}

function getMemeById(memeId) {
  return gMemes.find(meme => memeId === meme.id)
}

function _createMeme(imgData) {
  return {
    id: makeId(),
    data: imgData
  }
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gMemes)
}
