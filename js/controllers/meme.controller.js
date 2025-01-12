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

function onSelectImg(elImg, id) {
    _clearEditorContent()
    createMeme(elImg, id)
    renderMeme()
    document.querySelector('.meme-editor').style.visibility = 'visible'
}

function _clearEditorContent() {
    document.querySelector('.control-text input').value = ''
    document.querySelector('.edit-text select').value = 'Impact'
}

function renderMeme(isFinished = false) {
    const meme = getMeme()
    renderImg()
    renderTxt()

    function renderImg() {
        const elImg = document.getElementById(meme.selectedImgId)
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }

    function renderTxt() {
        gCtx.lineWidth = 1
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        meme.lines.forEach(line => {
            gCtx.fillStyle = line.clr.txt
            gCtx.strokeStyle = line.clr.outline
            gCtx.font = `${line.size}px ${line.font}`

            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
            gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        })

        if (isFinished) return

        var selectedLine = getSelectedLine()
        gCtx.font = `${selectedLine.size}px ${selectedLine.font}`
        const textMetrics = gCtx.measureText(selectedLine.txt)

        const width = textMetrics.width
        const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

        gCtx.strokeStyle = '#0c0';
        gCtx.lineWidth = 1.5;
        gCtx.strokeRect(
            selectedLine.pos.x - (width + 16) / 2,
            selectedLine.pos.y - (height + 16) / 2,
            width + 16,
            height + 16
        )
    }
}

function onResize() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

// canvas
function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos)
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
    moveLine(pos.x - gLinesStartPos[lineIdx].x, pos.y - gLinesStartPos[lineIdx].y)
    gLinesStartPos[lineIdx] = pos

    renderMeme()
}

function onUp() {
    setLineDrag(false)

    document.body.style.cursor = ''
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
    setLineText(txt || 'Enter text')
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
    const txt = sticker || 'Enter text'
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

function onDownloadMeme(elLink) {
    renderMeme(true)
    elLink.href = gElCanvas.toDataURL('image/jpeg')
}

function onShareMeme(ev) {
    renderMeme(true)
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    uploadImg(canvasData, onSuccess)
}