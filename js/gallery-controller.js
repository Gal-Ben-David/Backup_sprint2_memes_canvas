'use strict'

const gQueryOptions = { filterBy: '' }

function renderGallery() {
    const elGallery = document.querySelector('.img-container')

    const images = getImages(gQueryOptions.filterBy)

    const strHtmls = images.map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})"/>`)

    strHtmls.unshift(
        `<label for="file-upload" class="custom-file-label"><div class="plus-icon"><i class="fa-solid fa-plus"></i></div>
        <span>Add yours </span></label>
        <input type="file" id="file-upload" class="file-input btn" name="file-upload"
            onchange="onImgInput(event)">`
    )

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

function onFilterBy(elCategory) {
    gQueryOptions.filterBy = elCategory.toLowerCase()
    renderGallery()
}