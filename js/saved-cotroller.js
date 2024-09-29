'use strict'

var gClickedSavedBtn = false

function showSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'block'
    elSavedBtn.classList.add('open')
    renderSavedMemesToSaved()
}

function hideSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'none'
    elSavedBtn.classList.remove('open')
}

function onSaveMeme(elBtn) {
    gClickedSavedBtn = true
    elBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
    saveMeme()
}

function saveMeme() {
    const elCanvas = document.querySelector('canvas')
    const imgDataUrl = elCanvas.toDataURL('image/jpeg')

    const meme = {
        ...gMeme,
        imgDataUrl
    }

    let savedMemes = loadFromStorage('memes') || []

    savedMemes.push(meme)

    console.log(savedMemes)

    saveToStorage('memes', savedMemes)
}

function renderSavedMemesToSaved() {
    const savedMemes = loadFromStorage('memes') || []
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    const elSavedMemesSection = document.querySelector('.saved-memes')

    if (savedMemes.length === 0) {
        elSavedMemesSection.innerHTML = '<p>No saved memes yet...</p> <p> Start creating your own memes! 😎</p>'
        return
    }

    const strHtmls = savedMemes.map((meme, i) => `<img src="${meme.imgDataUrl}" onclick="onSetSavedMeme(${i})"/>`)

    elSavedMemesContainer.innerHTML = strHtmls.join('')
}

function onSetSavedMeme(idx) {
    setSavedMemeToCanvas(idx)
    renderSavedMemesToCanvas()
}

function renderSavedMemesToCanvas() {
    onShowEditor()
    renderMeme()
}