'use strict'

var gMeme = {
  src: 'img/1.jpg', lines: [
    _createLine('Add Text Here'),
    _createLine('not Immutable :('),
  ],
  selectedLine: -1,
  lineTxt() {
    if (!gMeme.lines.length) return
    return gMeme.lines[gMeme.selectedLine].txt
  },
  lineColor() {
    if (!gMeme.lines.length) return
    return gMeme.lines[gMeme.selectedLine].color
  },
  getStep() {
    return 5
  },
  getLine(index) {
    return gMeme.lines[index]
  },
  setAlign(align) {
    gMeme.lines[gMeme.selectedLine].align = align
  },
  setFont(font) {
    gMeme.lines[gMeme.selectedLine].font = font
  },
  setLoc(i, loc) {
    gMeme.lines[i].location = { ...loc }
  },
  hasLoc(i) {
    return gMeme.lines[i].location
  },
  deleteLine() {
    gMeme.lines.splice(gMeme.selectedLine, 1)
    switchLine()
  }
}

function initMemeService() {
  gMeme.selectedLine = 0
}

function getMeme() {
  return gMeme
}

function setMeme(meme) {
  gMeme = {
    ...gMeme, src: meme.src, lines: [
      _createLine(meme.txt)
    ]
  }
}

function getSelectedLine() {
  return gMeme.selectedLine
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLine].txt = txt
}

function setImg(imgSrc) {
  gMeme.src = imgSrc
}

function setFillStyle(color) {
  gMeme.lines[gMeme.selectedLine].color = color
}

function updateLineSize(sizeDelta) {
  gMeme.lines[gMeme.selectedLine].size += sizeDelta
}

function addLine() {
  let line = _createLine('Add Text Here')
  gMeme.lines.push(line)
  gMeme.selectedLine = gMeme.lines.length - 1
}

function switchLine() {
  if (!gMeme.lines.length) return
  gMeme.selectedLine++
  if (gMeme.selectedLine >= gMeme.lines.length) gMeme.selectedLine = 0
  return gMeme.lines[gMeme.selectedLine].txt
}

function setLineLocation(lineIdx, location) {
  gMeme.lines[lineIdx].location = location
}

function updateLocation(deltaY) {
  gMeme.lines[gMeme.selectedLine].location.y += deltaY
}

function setSelectedLine(clickLocation) {
  let selectedLine = gMeme.lines.findIndex(line => {
    const { location, size: height, txt } = line
    // is click in border?
    const bounds = getLineBounds(location, getTxtWidth(txt), height)
    // console.log('bounds:', bounds)
    if (isInBounds(clickLocation, bounds)) {
      return true
    }
  })
  if (selectedLine !== -1) gMeme.selectedLine = selectedLine

  return selectedLine
}

function _createLine(txt) {
  return { txt, color: '#ffffff', size: 40, align: 'center', font: 'arial' }
}
