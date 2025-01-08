'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderMeme()
}

function renderMeme() {
  let meme = getMemeById('')
  const elImg = new Image()
  elImg.src = meme.src
  elImg.onload = () => {
    coverCanvasWithImg(elImg)
    drawText(meme.line1, gElCanvas.width / 2, 20) // 20px half font size
  }
}

function onAddTxt(txt) {
  console.log(txt)
  setLineTxt(txt)
  renderMeme()
}