'use strict'

function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var id = ''

  for (var i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return id
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function titleCase(str) {
  return str[0].toUpperCase() + str.substr(1)
}

function cut(str, lastN) {
  return str.substr(0, str.length - lastN)
}

function makeLorem(wordCount = 3) {
  const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
  var txt = ''

  while (wordCount-- > 0) {
    txt += words[getRandomInt(0, words.length)] + ' '
  }
  return txt
}
