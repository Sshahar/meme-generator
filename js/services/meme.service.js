'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme = {
  src: 'img/1.jpg', lines: [
    _createLine('Add Text Here'),
    _createLine('not Immutable :('),
  ],
  selectedLine: -1
}

function onInitMemes() {
  gMeme.selectedLine = 0
}

function getMeme() {
  return gMeme
}

function getSelectedLine() {
  return gMeme.selectedLine
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLine].txt = txt
}

function setImg(imgSrc) {
  gMeme.src = imgSrc
}

function setFillStyle(color) {
  gMeme.lines[gMeme.selectedLine].color = color
}

function updateLineSize(sizeDelta) {
  gMeme.lines[gMeme.selectedLine].size += sizeDelta
}

function addLine() {
  let line = _createLine('Add Text Here')
  gMeme.lines.push(line)
  gMeme.selectedLine = gMeme.lines.length - 1
}

function switchLine() {
  gMeme.selectedLine++
  if (gMeme.selectedLine >= gMeme.lines.length) gMeme.selectedLine = 0
  return gMeme.lines[gMeme.selectedLine].txt
}

function setLineLocation(lineIdx, location) {
  gMeme.lines[lineIdx].location = location

}
function _createLine(txt) {
  return { txt, color: 'black', size: 40 }
}