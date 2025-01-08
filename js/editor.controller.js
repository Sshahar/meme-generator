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
      const { txt, color, size } = line
      const isSelected = i === meme.selectedLine
      let deltaY = 20 + i * 20
      if (deltaY > gElCanvas.height - 100) deltaY = 20 // TODO: change 100 with font height (first change line.font to line.size)
      drawText(txt, gElCanvas.width / 2, deltaY, isSelected, size, color,) // 20px half font size
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

function onAddLine() {
  addLine()

  renderMeme()
}

function onSwitchLine() {
  const txt = switchLine()
  $('.meme-text-input').val(txt)
  // TODO : add border to selected input (highlight)
  renderMeme()
}