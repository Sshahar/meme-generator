
function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawLine(line, isHighlighted) {
  const { txt, location, size, color } = line
  const { x, y } = location

  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'red'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(txt, x, y)

  if (isHighlighted) drawBorderRect(x, y, size, txt)
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