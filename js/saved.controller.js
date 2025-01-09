'use strict'

var gUpdateMeme

function onInitSaved() {
  renderMemes()
  onShowSection("saved")

}

function renderMemes() {
  var memes = getMemes()
  var strHtmls = memes.map(meme => `
    <article class="meme-list-image">
        <img onclick="onInitEditor('${meme.id}')" src=${meme.data}>
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
  gShouldPrint = true
  renderMeme("save")
}

function saveMeme() {
  const imgData = gElCanvas.toDataURL()
  const { src: imgSrc, lines } = getMeme()
  const meme = addMeme(imgData, imgSrc, lines)

  gShouldPrint = false
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