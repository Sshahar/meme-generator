'use strict'
// controller helper

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawLine(line, isHighlighted) {
  const { txt, location, size, color, align, font } = line
  const { x, y } = location

  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'red'
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.textAlign = align
  gCtx.textBaseline = 'middle'

  gCtx.fillText(txt, x, y)

  if (isHighlighted) drawBorderRect(x, y, size, txt)
}

function drawBorderRect(x, y, size, txt) {
  const txtWidth = getTxtWidth(txt)
  const bounds = getLineBounds({ x, y }, txtWidth, size)

  gCtx.strokeStyle = 'red'
  gCtx.strokeRect(bounds.x[0], bounds.y[0], txtWidth, size)
}

function getLineBounds(location, txtWidth, textHeight) {
  // height is font size; for width use gettxtWidth(txt)
  const { x, y } = location
  return { x: [x - (txtWidth / 2), x + (txtWidth / 2)], y: [y - (textHeight / 2), y + (textHeight / 2)] }
}

function getTxtWidth(txt) {
  return gCtx.measureText(txt).width
}

function isInBounds(location, bounds) {
  let xInBounds = location.x > bounds.x[0] && location.x <= bounds.x[1]
  let yInBounds = location.y > bounds.y[0] && location.y <= bounds.y[1]

  return xInBounds && yInBounds
}

// for debugging
function drawRect(x, y) {
  gCtx.strokeStyle = 'green'
  gCtx.strokeRect(x, y, 2, 2)
}

function loadImageFromSrc(imgData, onImageReady) {
  // document.querySelector('.share-container').innerHTML = ''
  const img = new Image()
  img.onload = () => {
    onImageReady(img)
  }
  img.src = imgData
}

function resizeCanvas(width = null) {
  if (width) {
    gElCanvas.width = width
    return
  }
  const elContainer = document.querySelector('.meme-editor-canvas')
  gElCanvas.width = elContainer.clientWidth

}

function showSection(section) {
  $(".meme-gallery-page").addClass("hidden")
  $(".meme-editor-page").addClass("hidden")
  $(".meme-saved-page").addClass("hidden")
  $(`.meme-${section}-page`).removeClass("hidden")
}

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
