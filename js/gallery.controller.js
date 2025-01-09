'use strict'

function onInitGallery() {
  initGallery()
  renderGallery()
  showSection("gallery")
}

function renderGallery(filterTxt = "") {
  const strHTML = getImages(filterTxt).map(image =>
    `
      <article class="meme-list-image">
        <img src="img/${image.src}" alt="smart meme" onclick="onImgSelect(this)">
      </article>
    `
  ).join('')


  document.querySelector('.meme-gallery-page .memes-grid-container')
    .innerHTML = strHTML
}

function onImgSelect(elImg) {
  setImg(elImg.src)
  renderMeme()

  showSection("editor")
}

function onSearchMeme(txt) {
  renderGallery(txt)
}

function onKeywordPressed(elBtn) {
  let searchTxt = titleCase(elBtn.value)
  let newSearch = searchTxt !== $('.search-meme-input').val()
  if (!newSearch) return

  onSearchMeme(searchTxt)
  $('.search-meme-input').val(searchTxt)

  let len = "em".length
  let size = +cut(elBtn.style.fontSize, len)
  size = size + 0.1
  if (size > 5) size = 5
  elBtn.style.fontSize = `${size}em`
}
