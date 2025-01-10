'use strict'

let gElCanvas
let gCtx
let gShouldPrint

document.querySelector('emoji-picker')
  .addEventListener('emoji-click', event => onEmojiInput(event.detail));

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

function onInitEditor(memeId = null) {
  if (memeId) {
    let meme = getMemeById(memeId)
    gMeme.src = meme.src
    gMeme.lines = _.cloneDeep(meme.lines)
  }

  renderMeme()
  showSection("editor")
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

    if (print === "download" && gShouldPrint) downloadMeme()
    else if (print === "save" && gShouldPrint) saveMeme()
    else if (print === "upload" && gShouldPrint) uploadMeme()
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
  gShouldPrint = true
  // TODO: fix save of highlight input
  renderMeme("download")
}


function downloadMeme() {
  const dataUrl = gElCanvas.toDataURL()
  const elLink = document.querySelector('.btn-download')
  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-perfect-img'
  elLink.click()
  gShouldPrint = false
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


function onUploadImg(ev) {
  ev.preventDefault()
  gShouldPrint = true
  renderMeme("upload")
}

function uploadMeme() {
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
  }

  uploadImg(canvasData, onSuccess)
}

function onSelectEmoji(elImg) {
  // Should set draw mode?
  if ($(elImg).hasClass('active')) {
    $(elImg).toggleClass('active')
    setDrawMode()
    return
  }

  setImageBrush(elImg)

  // Which image to highlight?
  let elImgs = document.querySelectorAll('.select-img-container img')
  for (var i = 0; i < elImgs.length; i++) {
    if (elImgs[i].classList.contains('active')
      && elImgs[i] !== elImg) {
      elImgs[i].classList.remove('active')
      break
    }
  }
  $(elImg).toggleClass('active')
}

function onEmojiInput(detail) {
  const unicode = detail.unicode
  const newTxt = $('.meme-text-input').val() + unicode
  onAddTxt(newTxt)
}

function onToggleEmojiPicker() {
  $('emoji-picker').toggleClass('hidden')
} 