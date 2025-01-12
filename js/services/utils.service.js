'use strict'

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var id = ''
    for (var i = 0; i < length; i++) {
        id += possible.charAt(getRandomInt(0, possible.length))
    }
    return id
}

function getPicSize(elImg) {
    return { width: elImg.naturalWidth, height: elImg.naturalHeight }
}

//storage
function saveToStorage(key, value) {
    var json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    return JSON.parse(json)
}