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

    gCanvas.addEventListener('click', handleClick)
}

function onShowGallery() {
    showGallery()
    hideEditor()
    hideSavedMemes()
    toggleMenu()
}

function onShowEditor() {
    showEditor()
    hideGallery()
    hideSavedMemes()
    toggleMenu()
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

