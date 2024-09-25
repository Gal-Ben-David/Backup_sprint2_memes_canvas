'use strict'

var gImgs = [...Array(18)]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 20,
            color: 'white',
            diffPos: ''
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

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
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = text
    if (!text) gMeme.lines[lineIdx].txt = 'aa'
}

function changeTextSize(diff) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += diff
}

function changeTextColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = color
}

function addTextLine() {
    gMeme.lines.push({
        txt: 'Add text here',
        size: 20,
        color: 'white',
        diffPos: ''
    })

    setLineDiffPos()
}

function setLineDiffPos() {
    gMeme.lines.map((line, i) => {
        if (i === 0) line.diffPos = -200
        if (i === 1) line.diffPos = 200
        if (i > 1) line.diffPos = 0
    }
    )
}

function switchTextLine() {
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx)
}




