'use strict'

var gImgs = [...Array(18)]

function setImagesInArray() {
    gImgs.forEach((_, i) => {
        if (i <= 17) {
            gImgs[i] = ({
                id: (i + 1),
                url: `img/${i + 1}.jpg`,
                keywords: []
            })
        }
    })
}

function getImages() {
    return gImgs
}

function getImgUrlById(idx) {
    gMeme.selectedImgId = idx
    const selectedImg = gImgs.find(img => img.id === idx)
    return selectedImg.url
}