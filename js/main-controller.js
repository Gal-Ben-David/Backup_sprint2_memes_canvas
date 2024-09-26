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
}

function onShowEditor() {
    showEditor()
    hideGallery()
}

function toggleMenu() {
    const buttons = document.querySelector('.buttons');
    buttons.classList.toggle('open');
}