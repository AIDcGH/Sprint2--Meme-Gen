'use strict'

const gImgs = _createImgs()

const gKeywordSearchCountMap = _getKwSearchCountMap()

var gMeme
createMeme(gImgs[0].id)
createMeme(gImgs[0].id)

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

function _getKwSearchCountMap() {
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
        lines: [addLine({ x: 10, y: 10 }, 'Top text'), addLine({ x: 0, y: 100 }, 'Bottom text')]
        lines: [addLine({ x: 10, y: 10 }, 'Top text'), addLine({ x: 0, y: 100 }, 'Bottom text')]
    }
}

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
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getLinesStartPos() {
    return gMeme.lines.reduce((linesStartPos, line) => {
        linesStartPos.push(line.pos)
        return linesStartPos
    }, [])
}

// text control
function lineClickedIdx(clickedPos, ctx) {
    console.log(clickedPos)
    const clickedLineIdx = gMeme.lines.findIndex(line => {
        const { pos, txt } = line
        const {
            width,
            actualBoundingBoxAscent,
            actualBoundingBoxDescent
        } = ctx.measureText(txt)

        return clickedPos.x >= pos.x &&
            clickedPos.x <= pos.x + width &&
            clickedPos.y >= pos.y - actualBoundingBoxAscent &&
            clickedPos.y <= pos.y + actualBoundingBoxDescent
    })
    if (clickedLineIdx > -1) gMeme.selectedLineIdx = clickedLineIdx
    return clickedLineIdx
}

function setLineDrag(isDrag) {
    getSelectedLine().isDrag = isDrag
}

function setLineText(newTxt) {
    getSelectedLine().txt = newTxt
    getSelectedLine().txt = newTxt
}

function switchLine() {
    const curIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx =
        curIdx !== gMeme.lines.length - 1 ? curIdx + 1 : 0
}

function addLine(pos, txt, size = 48, clr = '#fff') {
    return { pos, isDrag: false, txt, size, clr }
    return { pos, isDrag: false, txt, size, clr }
}

function delLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

// text editing
function changeFontSize(amount) {
    if (getSelectedLine().size <= 4) return
    if (getSelectedLine().size >= 400) return
    if (getSelectedLine().size <= 4) return
    if (getSelectedLine().size >= 400) return

    getSelectedLine().size += amount
    getSelectedLine().size += amount
}

function changeClr(newClr) {
    getSelectedLine().clr = newClr
    getSelectedLine().clr = newClr
}