'use strict'

var gElCanvas
var gCtx
var gLinesStartPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gLinesStartPos = getLinesStartPos()
    renderGallery()
    renderKeywords()
}

function renderKeywords() {
    const kwsc = getKwSearchCount()
    var strHTML = ''
    for (let key in kwsc) {
        strHTML += `<div>${key}</div>`
    }
    document.querySelector('.kw-filter').innerHTML = strHTML
}

function renderGallery() {
    var strHTML = getImgs().map(img => `
        <img src="${img.url}" alt="" onclick="onSelectImg('${img.id}')">
        `).join('')
    document.querySelector('.memes-gallery').innerHTML = strHTML
}

function renderMeme() {

}

function onResize() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

function toggleDropdown() {
    document.querySelector('.dropdown-menu').classList.toggle('open')
}

////////////////////// generate meme

// canvas
function onDown(ev) {
    const pos = getEvPos(ev)
    const clickedLineIdx = lineClickedIdx(pos, gCtx)

    if (clickedLineIdx === -1) return

    setLineDrag(true)

    gLinesStartPos[clickedLineIdx] = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

}

function onUp() {

}

function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
// text control
function onText(txt) {

}

function onBtnMove(amount) {

}

function onSwitchLine() {

}

function onAddLine(sticker = null) {

}

function onDelLine() {

}

// text editing
function onChangeFontSize(amount) {

}

function onChangeFont(font) {

}

function onChangeClr(isOutline = false) {

}

// meme control
function onSaveMeme() {

}

function onDownloadMeme() {

}

function onShareMeme() {

}