'use strict'


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