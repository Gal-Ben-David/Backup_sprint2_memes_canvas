'use strict'

var gClickedSavedBtn = false

function showSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'block'
    elSavedBtn.classList.add('active')
    renderSavedMemesToSaved()
}

function hideSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'none'
    elSavedBtn.classList.remove('active')
}

function onSaveMeme(elBtn) {
    gClickedSavedBtn = true
    elBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
    saveMeme()
}

function saveMeme() {
    console.log('hi')
    const elCanvas = document.querySelector('canvas')
    const imgDataUrl = elCanvas.toDataURL('image/jpeg')

    const meme = {
        ...gMeme,
        imgDataUrl
    }

    let savedMemes = loadFromStorage('memes') || []

    savedMemes.push(meme)

    saveToStorage('memes', savedMemes)
}

function renderSavedMemesToSaved() {
    const gSavedMemes = loadFromStorage('memes') || []

    const elSavedMemes = document.querySelector('.saved-memes-container')

    const strHtmls = gSavedMemes.map((meme, i) => `<img src="${meme.imgDataUrl}" onclick="onSetSavedMeme(${i})"/>`)

    elSavedMemes.innerHTML = strHtmls.join('')
}

function onSetSavedMeme(idx) {
    setSavedMemeToCanvas(idx)
    renderSavedMemesToCanvas()
}

function renderSavedMemesToCanvas() {
    onShowEditor()
    renderMeme()
}
