'use strict'

var gUpdateMeme

function onInitSaved() {
  renderMemes()
  showSection("saved")

}

function renderMemes() {
  var memes = getMemes()
  var strHtmls = memes.map(meme => `
    <article class="meme-list-image">
        <img src=${meme.data}>
		 <button data-index="1" class="delete-saved-button" onclick="onRemoveMeme('${meme.id}')">Delete</button>
        </article>
  `)
  document.querySelector('.saved-memes-container').innerHTML = strHtmls.join('')
}

// CRUD

function onRemoveMeme(memeId) {
  removeMeme(memeId)
  renderMemes()
  flashMsg(`Meme Deleted`)
}

function onSaveMeme() {
  const imgData = gElCanvas.toDataURL()
  const meme = addMeme(imgData)

  renderMemes()
  flashMsg(`Meme Meme (id: ${meme.id})`)
}

// UI

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')

  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => el.classList.remove('open'), 3000)
}