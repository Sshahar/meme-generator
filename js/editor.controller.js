'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderMeme()



}

function renderMeme() {
  // const elImg = new Image()
  // elImg.src = 'img/1.jpg'
  // elImg.onload = () => {
  //   coverCanvasWithImg(elImg)
  //   drawText('Hola!', gElCanvas.width / 2, 20) // 20px half font size
  // }
  let { data } = getMemeById('')
  loadImageFromSrc(data, renderImg)
}
