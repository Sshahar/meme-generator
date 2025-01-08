'use strict'

renderGallery()
function renderGallery() {
  let strHTML = ''
  for (let i = 0; i < 18; i++) {
    strHTML += `
        <article class="meme-list-image">
          <img src="img/${i + 1}.jpg" alt="smart meme" onclick="onImgSelect(this)">
        </article>
    `
  }

  document.querySelector('.meme-gallery-page .memes-grid-container')
    .innerHTML = strHTML
}

function onImgSelect(elImg) {
  setImg(elImg.src)
  renderMeme()

  showSection("editor")
}