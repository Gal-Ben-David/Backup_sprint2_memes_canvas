'use strict'

var gImgs = [...Array(18)]
var gImgCategories = [
    ['funny', 'men'], ['animal'], ['baby', 'animal'], ['animal'], ['baby'], ['funny', 'men'],
    ['baby', 'funny'], ['funny', 'men'], ['baby', 'funny'], ['funny'], ['awkward', 'men'], ['men'], ['men'],
    ['men'], ['men', 'funny'], ['men', 'funny'], ['men'], ['funny']]

var gKeywordSearchCountMap = { 'men': 28, 'baby': 20, 'funny': 34, 'awkward': 15, 'animal': 25 }

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

function updateKeywordSearchCountMap(category) {
    gKeywordSearchCountMap[category] += 1
}

function getKeywords() {
    return gKeywordSearchCountMap
}