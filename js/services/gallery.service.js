'use strict'

const STORAGE_KEY = 'imageDB'

var gImages

function onGalleryInit() {
  _createImages()
}

function getImages(filterTxt = "") {
  return _filterImages(filterTxt)
}

function _filterImages(filterTxt) {
  return gImages.filter(image => image.tag.includes(filterTxt))
}

function addImage(src, tag) {
  var image = _createImage(src, tag)
  gImages.unshift(image)

  _saveImagesToStorage()
  return image
}

function getImageById(imageId) {
  return gImages.find(image => imageId === image.id)
}

function _createImages() {
  gImages = loadFromStorage(STORAGE_KEY)
  if (gImages && gImages.length) return

  // If no images in storage - generate data

  gImages = []
  const tags = ["Happy", "Sad", "Crazy", "Sarcastic", "Funny ",]

  for (let i = 0; i < 18; i++) {
    const tag = tags[Math.floor(Math.random() * tags.length)]
    gImages.push(_createImage(`${i + 1}.jpg`, tag))
  }
  _saveImagesToStorage()
}

function _createImage(src, tag) {
  return {
    id: makeId(),
    src,
    tag
  }
}

function _saveImagesToStorage() {
  saveToStorage(STORAGE_KEY, gImages)
}
