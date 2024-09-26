'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.img-container')

    const images = getImages()

    const strHtmls = images.map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})"/>`)

    elGallery.innerHTML = strHtmls.join('')
}

function showGallery() {
    const elGallery = document.querySelector('.gallery')
    const elGalleryBtn = document.querySelector('.gallery-btn')

    elGallery.style.display = 'block'
    elGalleryBtn.classList.add('active')
}

function hideGallery() {
    const elGallery = document.querySelector('.gallery')
    const elGalleryBtn = document.querySelector('.gallery-btn')

    elGallery.style.display = 'none'
    elGalleryBtn.classList.remove('active')
}