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

    elGallery.style.display = 'flex'
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

function onClickedCategory(elCategoryBtn) {
    updateKeywordSearchCountMap(elCategoryBtn.value)
    onFilterBy(elCategoryBtn.value)

    renderKeywords()
}

function renderKeywords() {
    const keywordSearchCountMap = getKeywords()
    const elKewwordsContainer = document.querySelector('.keywords')

    const keywords = [...Object.keys(keywordSearchCountMap)]
    const keywordsSizes = [...Object.values(keywordSearchCountMap)]

    const strHtmls = keywords.map((keyword, i) =>
        `<button value="${keyword}" onclick="onClickedCategory(this)" 
    style="font-size:${keywordsSizes[i]}px">${keyword}</button>`)

    elKewwordsContainer.innerHTML = strHtmls.join('')
}