'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme = { src: 'img/1.jpg', line1: 'Halala' }

function onInitMemes() {
}

function getMeme() {
  return gMeme
}

function getMemes() {
  return gMemes
}

function removeMeme(memeId) {
  const memeIdx = gMemes.findIndex(meme => memeId === meme.id)
  gMemes.splice(memeIdx, 1)

  _saveMemesToStorage()
}

function addMeme(vendor, maxSpeed) {
  var meme = _createMeme(vendor, maxSpeed)
  gMemes.unshift(meme)

  _saveMemesToStorage()
  return meme
}

function getMemeById(memeId) {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.line1 = txt
}

function setImg(imgSrc) {
  gMeme.src = imgSrc
}

function _createMeme() {
  // return {
  //   id: makeId(),
  // }
}
