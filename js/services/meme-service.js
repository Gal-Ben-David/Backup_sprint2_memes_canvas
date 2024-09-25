'use strict'

var gImgs = [...Array(18)]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImages() {
    return gImgs
}

function getImgUrlById(idx) {
    gMeme.selectedImgId = idx
    const selectedImg = gImgs.find(img => img.id === idx)
    return selectedImg.url
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
    if (!text) gMeme.lines[0].txt = 'Add text here'
}

function setImagesInArray() {
    gImgs.map((_, i) => {
        if (i <= 17) {
            gImgs[i] = ({
                id: (i + 1),
                url: `img/${i + 1}.jpg`,
                keywords: []
            })
        }
    })
}


