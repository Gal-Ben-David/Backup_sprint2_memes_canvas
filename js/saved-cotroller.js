'use strict'

function showSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'block'
    elSavedBtn.classList.add('active')
}

function hideSavedMemes() {
    const elSaved = document.querySelector('.saved-memes')
    const elSavedBtn = document.querySelector('.saved-btn')

    elSaved.style.display = 'none'
    elSavedBtn.classList.remove('active')
}