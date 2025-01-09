'use strict'

var gElCanvas
var gCtx
var gLinesStartPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    _linesStartPos()
    renderGallery()
    renderKeywords()
}

function _linesStartPos() {
    gLinesStartPos = getLinesStartPos()
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
    if (!getSelectedLine().isDrag) return
    const pos = getEvPos(ev)
    const lineIdx = getSelectedLineIdx()

    moveLine(pos.x - gLinesStartPos[lineIdx].x, pos.y - gLinesStartPos[lineIdx])
    gLinesStartPos[lineIdx] = pos

    renderMeme()
}

function onUp() {
    setLineDrag(false)

    document.body.style.cursor = 'grab'
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
    setLineText(txt)
    renderMeme()
}

function onBtnMove(amount) {
    moveLine(0, amount)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAddLine(sticker = null) {
    const txt = sticker || 'New line'
    addLine({ x: gElCanvas.width / 2, y: gElCanvas.height / 2 }, txt)
    _linesStartPos()
    renderMeme()
}

function onDelLine() {
    delLine()
    _linesStartPos()
    renderMeme()
}

// text editing
function onChangeFontSize(amount) {
    changeFontSize(amount)
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onChangeClr(isOutline = false) {
    changeClr(document.getElementById('clr-input').value, isOutline)
    renderMeme()
}

// meme control
function onSaveMeme() {

}

function onDownloadMeme() {

}

function onShareMeme() {

}