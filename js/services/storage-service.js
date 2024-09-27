'use strict'

function saveToStorage(key, value) {
    const strValue = JSON.stringify(value)
    localStorage.setItem(key, strValue)
    console.log('hi')
}

function loadFromStorage(key) {
    const strValue = localStorage.getItem(key)
    return JSON.parse(strValue)
}