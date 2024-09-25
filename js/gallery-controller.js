'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')

    const images = getImages()

    const strHtmls = images.map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})"/>`)

    elGallery.innerHTML = strHtmls.join('')

}