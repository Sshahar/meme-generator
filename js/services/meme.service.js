'use strict'

const STORAGE_KEY = 'memeDB'

var _selectedLine
var gMeme = {
  src: 'img/1.jpg', lines: [
    { txt: 'Add Text Here', color: 'black', font: '40px Arial', },
    { txt: 'I AM Immutable', color: 'black', font: '40px Arial', },
  ],
}

function onInitMemes() {
  _selectedLine = 0
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
  gMeme.lines[_selectedLine].txt = txt
}

function setImg(imgSrc) {
  gMeme.src = imgSrc
}

function setFillStyle(color) {
  gMeme.lines[_selectedLine].color = color
}

function _createMeme() {
  // return {
  //   id: makeId(),
  // }
}

function updateLineSize(sizeDelta) {
  let entireFont = gMeme.lines[_selectedLine].font
  const font = entireFont.split(' ')[1]
  let size = entireFont.split(' ')[0]
  size = +size.substring(0, size.length - 2) //  remove 'px'

  size += sizeDelta

  entireFont = `${size}px ${font}`
  gMeme.lines[_selectedLine].font = entireFont
}
