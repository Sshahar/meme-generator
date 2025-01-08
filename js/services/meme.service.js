'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme = {
  src: 'img/1.jpg', lines: [
    { txt: 'Add Text Here', color: 'black', font: '40px Arial', },
    { txt: 'not Immutable :(', color: 'black', font: '40px Arial', },
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
  let entireFont = gMeme.lines[gMeme.selectedLine].font
  const font = entireFont.split(' ')[1]
  let size = entireFont.split(' ')[0]
  size = +size.substring(0, size.length - 2) //  remove 'px'

  size += sizeDelta

  entireFont = `${size}px ${font}`
  gMeme.lines[gMeme.selectedLine].font = entireFont
}

function addLine() {
  let line = { txt: 'Add Text Here', color: 'black', font: '40px Arial', }
  gMeme.lines.push(line)
}

function switchLine() {
  gMeme.selectedLine++
  if (gMeme.selectedLine >= gMeme.lines.length) gMeme.selectedLine = 0
  return gMeme.lines[gMeme.selectedLine].txt
}
