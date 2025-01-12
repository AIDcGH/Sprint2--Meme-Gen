'use strict'

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
        <img src="${img.url}" alt="" id="${img.id}" onclick="onSelectImg(this, '${img.id}')">
        `).join('')
    document.querySelector('.memes-gallery').innerHTML = strHTML
}

function toggleDropdown() {
    document.querySelector('.dropdown-menu').classList.toggle('open')
}
