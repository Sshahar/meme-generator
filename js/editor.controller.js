'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

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

function onUp() { }

function getEvLoc(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let loc = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right loc according to the touch screen
    loc = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return loc
}
