'use strict'

function onInitGallery() {
  onGalleryInit()
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
