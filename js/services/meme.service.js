'use strict'

const gImgs = _createImgs()

const gKeywordSearchCountMap = _createKwSearchCountMap()

var gMeme
createMeme(gImgs[0].id)

// creates
function _createImgs() {
    return [
        _createImg('meme-imgs/meme-imgs (square)/1.jpg', ['political', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/2.jpg', ['cute', 'dog']),
        _createImg('meme-imgs/meme-imgs (square)/3.jpg', ['cute', 'dog', 'baby']),
        _createImg('meme-imgs/meme-imgs (square)/4.jpg', ['cute', 'funny', 'cat']),
        _createImg('meme-imgs/meme-imgs (square)/5.jpg', ['funny', 'baby']),
        _createImg('meme-imgs/meme-imgs (square)/6.jpg', ['funny', 'weird', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/7.jpg', ['cute', 'funny', 'weird', 'baby']),
        _createImg('meme-imgs/meme-imgs (square)/8.jpg', ['funny', 'fictional', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/9.jpg', ['cute', 'funny', 'baby']),
        _createImg('meme-imgs/meme-imgs (square)/10.jpg', ['political', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/11.jpg', ['funny', 'weird', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/12.jpg', ['adult']),
        _createImg('meme-imgs/meme-imgs (square)/13.jpg', ['adult']),
        _createImg('meme-imgs/meme-imgs (square)/14.jpg', ['fictional', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/15.jpg', ['fictional', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/16.jpg', ['funny', 'fictional', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/17.jpg', ['political', 'adult']),
        _createImg('meme-imgs/meme-imgs (square)/18.jpg', ['funny', 'fictional'])
    ]
}

function _createImg(url, keywords) {
    return {
        id: makeId(),
        url,
        keywords
    }
}

function _createKwSearchCountMap() {
    return gImgs
        .map(img => img.keywords)
        .flat()
        .reduce((kwCount, kw) => {
            if (!kwCount[kw]) kwCount[kw] = 0
            return kwCount
        }, {})
}

function createMeme(selectedImgId) {
    gMeme = {
        selectedImgId,
        selectedLineIdx: 0,
        lines: []
    }
    addLine({ x: 48, y: 8 }, 'Top text')
    addLine({ x: 48, y: 92 }, 'Bottom text')
}

// gets
function getMeme() {
    return gMeme
}

function getKwSearchCount() {
    return gKeywordSearchCountMap
}

function getImgs() {
    return gImgs
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getLinesStartPos() {
    return gMeme.lines.reduce((linesStartPos, line) => {
        linesStartPos.push(line.pos)
        return linesStartPos
    }, [])
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

// text control
function lineClickedIdx(clickedPos, ctx) {
    const clickedLineIdx = gMeme.lines.findIndex(line => {
        const { pos, txt } = line
        const {
            width,
            actualBoundingBoxAscent,
            actualBoundingBoxDescent
        } = ctx.measureText(txt)
        const height = actualBoundingBoxAscent + actualBoundingBoxDescent
        const left = pos.x - width / 2
        const top = pos.y - height / 2
        console.log(left, left + width, top, top + height)
        return clickedPos.x >= left &&
            clickedPos.x <= left + width &&
            clickedPos.y >= top &&
            clickedPos.y <= top + height
    })
    if (clickedLineIdx > -1) gMeme.selectedLineIdx = clickedLineIdx
    return clickedLineIdx
}

function setLineDrag(isDrag) {
    getSelectedLine().isDrag = isDrag
}

function moveLine(dx, dy) {
    const selectedLine = getSelectedLine()
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
}

function setLineText(newTxt) {
    console.log(getSelectedLine())
    getSelectedLine().txt = newTxt
}

function switchLine() {
    const curIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx =
        curIdx !== gMeme.lines.length - 1 ? curIdx + 1 : 0
}

function addLine(pos, txt, size = 16, clr = {txt: '#fff', outline: '#000'}) {
    gMeme.lines.push({ pos, isDrag: false, txt, size, clr, font:'Impact' })
}

function delLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

// text editing
function changeFontSize(amount) {
    if (getSelectedLine().size <= 4) return
    if (getSelectedLine().size >= 400) return

    getSelectedLine().size += amount
}

function changeFont(font) {
    getSelectedLine().font = font
}

function changeClr(newClr, isOutline) {
    if (isOutline) getSelectedLine().clr.outline = newClr
    else getSelectedLine().clr.txt = newClr
}