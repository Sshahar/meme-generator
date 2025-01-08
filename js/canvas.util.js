
function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y, isHighlighted, fontSize, color = 'black',) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'red'
  gCtx.fillStyle = color
  gCtx.font = `${fontSize}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y)

  if (isHighlighted) drawBorderRect(x, y, fontSize, text)
}

function drawBorderRect(x, y, size, text) {
  // Measure the text width
  const textMetrics = gCtx.measureText(text)
  const textWidth = textMetrics.width
  const textHeight = size

  gCtx.strokeStyle = 'red'
  gCtx.strokeRect(x - (textWidth / 2), y - (textHeight / 2), textWidth, size)

}

function loadImageFromSrc(imgData, onImageReady) {
  // document.querySelector('.share-container').innerHTML = ''
  const img = new Image()
  img.onload = () => {
    onImageReady(img)
  }
  img.src = imgData
}

function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  drawText('Hola!', gElCanvas.width / 2, 20) // 20px half font size
}