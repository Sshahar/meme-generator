'use strict'

renderGallery()
function renderGallery() {
  let strHTML = [1, 2].map(img =>
    `
        <article class="meme-list-image">
          <img src="img/${img}.jpg" alt="smart meme" onclick="onImgSelect(this)">
        </article>
    `).join('')
  document.querySelector('.meme-gallery-page .memes-grid-container')
    .innerHTML = strHTML
}

function onImgSelect(elImg) {
  setImg(elImg.src)
  renderMeme()

  showSection("editor")
}