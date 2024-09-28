'use strict'

let gCanvas
let gContext

function onInit() {
    gCanvas = document.querySelector('canvas')
    gContext = gCanvas.getContext('2d')

    setLineDiffPos()
    setStickersInArray()
    setImagesInArray()
    renderGallery()
    renderStickerIcons()
    renderMeme()

    addListeners()
}

function onShowGallery() {
    showGallery()
    hideEditor()
    hideSavedMemes()
    renderKeywords()
}

function onShowEditor() {
    showEditor()
    hideGallery()
    hideSavedMemes()
}

function onShowSavedMemes() {
    showSavedMemes()
    hideEditor()
    hideGallery()
}

function toggleMenu() {
    const buttons = document.querySelector('.buttons');
    buttons.classList.toggle('open');
}

