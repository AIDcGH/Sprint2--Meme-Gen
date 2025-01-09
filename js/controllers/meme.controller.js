'use strict'

function onInit() {
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
    
}

function toggleDropdown() {
    document.querySelector('.dropdown-menu').classList.toggle('open')
}

////////////////////// generate meme

// canvas
function onDown(ev) {
    
}

function onMove(ev) {
    
}

function onUp() {
    
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