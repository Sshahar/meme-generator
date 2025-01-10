'use strict'

const REPO_URL = "https://media.githubusercontent.com/media/Sshahar/meme-generator/master"

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  initMemeService()
  initSavedService()
  onInitGallery()
  renderMeme()

}

function toggleMenu() {
  document.body.classList.toggle("menu-open")
  $(".filter-search-section").toggle("display")
}

function onShowSection(section) {
  showSection(section)

  // Mobile only
  if (window.matchMedia('screen and (max-width: 640px)').matches) {
    toggleMenu()
  }
}