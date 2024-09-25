'use strict'

var gImgs = [...Array(18)]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [createLine()]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

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

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = (!text) ? gMeme.lines[lineIdx].txt : text
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
    checkIfTextLineIsEmpty()
    gMeme.lines.push(createLine())

    setLineDiffPos()

    return gMeme.lines.length - 1
}

function createLine() {
    return {
        txt: 'Add text here',
        size: 20,
        color: 'white',
        diffPos: '',
        txtArea: { x: '', y: '', width: '', height: '' }
    }
}

function setLineDiffPos() {
    gMeme.lines.forEach((line, i) => {
        if (i === 0) line.diffPos = -200
        if (i === 1) line.diffPos = 200
        if (i > 1) line.diffPos = 0
    })
}

function switchTextLine(idx) {
    gMeme.selectedLineIdx = (!idx) ? gMeme.selectedLineIdx += 1 : idx

    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    console.log('idx', gMeme.selectedLineIdx)
    return gMeme.selectedLineIdx
}

function setTextArea(x, y, width, height, idx) {
    Object.assign(gMeme.lines[idx].txtArea, { x, y, width, height })
    console.log(gMeme.lines[idx].txtArea)
}

function checkIfTextLineIsEmpty() {
    const lineIdxToRemove = gMeme.lines.findIndex(line => line.txt === '')
    if (lineIdxToRemove !== -1) gMeme.lines.splice(lineIdxToRemove, 1)
}



