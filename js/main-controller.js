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

    const buttons = document.querySelector('.buttons');
    buttons.classList.remove('open');
}

function onShowEditor() {
    showEditor()
    hideGallery()
    hideSavedMemes()

    const buttons = document.querySelector('.buttons');
    buttons.classList.remove('open');
}

function onShowSavedMemes() {
    showSavedMemes()
    hideEditor()
    hideGallery()

    setStickersInArray()
    setImagesInArray()
    renderGallery()
    renderStickerIcons()
}

function toggleMenu() {
    const buttons = document.querySelector('.buttons');
    buttons.classList.toggle('open');
}

