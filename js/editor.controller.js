'use strict'

let gElCanvas
let gCtx

document.body.addEventListener('keydown', function onEventHandler(ev) {
  switch (ev.key) {
    case "ArrowUp":
      updateLocation(-gMeme.getStep())
      break;
    case "ArrowDown":
      updateLocation(gMeme.getStep())
      break;
  }
  renderMeme()
})

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  onInitMemes()
  renderMeme()

  onInitGallery()
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

      // line has no location?
      if (!gMeme.hasLoc(i)) setLineLocation(i, { x: gElCanvas.width / 2, y: deltaY })

      drawLine(line, isSelected)
    })
  }

  renderEditor()
}

function renderEditor() {
  $('.meme-text-input').val(gMeme.lineTxt())
  $('.meme-text-color').val(gMeme.lineColor())
}

function onAddTxt(txt) {
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
  // $('.meme-text-input').val(txt)
  renderMeme()
}

function onDown(ev) {
  const clickLocation = getEvLoc(ev)
  // console.log('clickLocation:', clickLocation)
  const txt = highlightLine(clickLocation)

  renderMeme()
}


function onSetAlignment(align) {
  gMeme.setAlign(align)
  renderMeme()
}

function onSetFont(font) {
  gMeme.setFont(font)
  renderMeme()
}

function onDeleteLine() {
  gMeme.deleteLine()
  renderMeme()
}