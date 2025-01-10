'use strict'

function onInitRandomized() {
  const meme = { src: randomImg(), txt: makeLorem() }
  setMeme(meme)
  renderMeme()
  showSection("editor")
}

function randomImg() {
  const img = Math.floor(Math.random() * 18)
  return `${REPO_URL}/img/${img}.jpg`
}
