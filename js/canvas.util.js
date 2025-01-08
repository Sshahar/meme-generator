
function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y, color = 'black') {
  gCtx.lineWidth = 2
  // gCtx.strokeStyle = 'brown'
  gCtx.fillStyle = color
  gCtx.font = '40px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y)
  // gCtx.strokeText(text, x, y)
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