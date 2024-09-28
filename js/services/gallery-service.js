'use strict'

var gImgs = [...Array(18)]
var gImgCategories = [
    ['funny', 'Men'], ['animal'], ['baby', 'animal'], ['animal'], ['baby'], ['funny', 'Men'],
    ['baby', 'funny'], ['funny', 'Men'], ['baby', 'funny'], ['funny'], ['awkward', 'Men'], ['Men'], ['Men'],
    ['Men'], ['Men', 'funny'], ['Men', 'funny'], ['Men'], ['funny']]

function setImagesInArray() {
    gImgs.forEach((_, i) => {
        if (i <= 17) {
            gImgs[i] = ({
                id: (i + 1),
                url: `img/${i + 1}.jpg`,
                keywords: [
                    ...gImgCategories[i]
                ]
            })
        }
    })
}

function getImages(category) {
    let images = filterImgBy(category)
    return images
}

function getImgUrlById(idx) {
    gMeme.selectedImgId = idx
    const selectedImg = gImgs.find(img => img.id === idx)
    return selectedImg.url
}

function filterImgBy(category) {
    let images
    if (!category) images = gImgs
    else images = gImgs.filter(img => img.keywords.some(keyword => keyword.includes(category)))

    return images
}