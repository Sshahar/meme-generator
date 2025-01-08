'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  onInitMemes()
  renderMeme()
}

function renderMeme() {
  const { src: imgSrc, ...meme } = getMeme()

  const elImg = new Image()
  elImg.src = imgSrc
  elImg.onload = () => {
    coverCanvasWithImg(elImg)
    meme.lines.forEach((line, i) => {
      const { txt, color, font } = line
      drawText(txt, gElCanvas.width / 2, 20 + i * 200, color, font) // 20px half font size
    })
  }
}

function onAddTxt(txt) {
  console.log(txt)
  setLineTxt(txt)
  renderMeme()
}

function onDownloadMeme(elLink) {
  const dataUrl = gElCanvas.toDataURL()

  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-perfect-img'
}

function onSetFillStyle(color) {
  setFillStyle(color)
  renderMeme()
}

function onUpdateLineSize(sizeDelta) {
  updateLineSize(sizeDelta)
  renderMeme()
}
