'use strict'

let gElCanvas
let gCtx
let gShouldDownload

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

window.addEventListener("keydown", function (e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  onInitMemes()
  renderMeme()

  onInitGallery()
  initSavedService()
}

function renderMeme(print = false) {
  const { src: imgSrc, ...meme } = getMeme()

  const elImg = new Image()
  elImg.src = imgSrc
  elImg.onload = () => {
    coverCanvasWithImg(elImg)
    meme.lines.forEach((line, i) => {
      const { size } = line
      const isSelected = i === meme.selectedLine && !print
      const halfSize = size / 2
      let deltaY = halfSize + i * size
      if (deltaY > gElCanvas.height - halfSize) deltaY = halfSize

      // should generate new-line location?
      if (!gMeme.hasLoc(i)) setLineLocation(i, { x: gElCanvas.width / 2, y: deltaY })

      drawLine(line, isSelected)

    })

    if (print && gShouldDownload) downloadMeme()
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
  gShouldDownload = true
  // TODO: fix save of highlight input
  renderMeme(downloadMeme)
}


function downloadMeme() {
  const dataUrl = gElCanvas.toDataURL()
  const elLink = document.querySelector('.btn-download')
  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-perfect-img'
  elLink.click()
  gShouldDownload = false
  renderMeme()
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