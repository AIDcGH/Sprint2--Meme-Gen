'use strict'

const gImgs = _createImgs()

const gKeywordSearchCountMap = _getKwSearchCountMap()

var gMeme

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
        lines: [addLine('Top text'), addLine('Bottom text')]
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

// text control
function setLineText(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx] = newTxt
}

function switchLine() {
    const curIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx =
        curIdx !== gMeme.lines.length - 1 ? curIdx + 1 : 0
}

function addLine(txt, size = 48, clr = '#fff') {
    return {
        txt,
        size,
        clr
    }
}

function delLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

// text editing
function changeFontSize(amount) {
    if (gMeme.lines[selectedLineIdx].size <= 4) return
    if (gMeme.lines[selectedLineIdx].size >= 400) return

    gMeme.lines[selectedLineIdx].size += amount
}

function changeClr(newClr) {
    gMeme.lines[selectedLineIdx].clr = newClr
}