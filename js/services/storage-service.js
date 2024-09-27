'use strict'

function saveToStorage(key, value) {
    const strValue = JSON.stringify(value)
    localStorage.setItem(key, strValue)
}

function loadFromStorage(key) {
    const strValue = localStorage.getItem(key)
    return JSON.parse(strValue)
}