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
      const { size } = line
      const isSelected = i === meme.selectedLine
      const halfSize = size / 2
      let deltaY = halfSize + i * size
      if (deltaY > gElCanvas.height - halfSize) deltaY = halfSize

      setLineLocation(i, { x: gElCanvas.width / 2, y: deltaY })
      drawLine(line, isSelected)
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
  // TODO: fix save of highlight input

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

function onAddLine() {
  addLine()

  renderMeme()
}

function onSwitchLine() {
  const txt = switchLine()
  $('.meme-text-input').val(txt)
  renderMeme()
}