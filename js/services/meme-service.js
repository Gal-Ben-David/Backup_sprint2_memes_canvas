'use strict'

var gImgs = [...Array(18)]
var gStickers = [...Array(6)]

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

function setStickersInArray() {
    gStickers.forEach((_, i) => {
        if (i <= 7) {
            gStickers[i] = ({
                id: (i + 1),
                url: `img/sticker${i + 1}.png`
            })
        }
    })
}

function getStickers() {
    return gStickers
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
}

function changeTextSize(diff) {
    const lineIdx = gMeme.selectedLineIdx

    if (gMeme.lines[lineIdx].isSticker) {
        gMeme.lines[lineIdx].txtArea.width += diff
        gMeme.lines[lineIdx].txtArea.height += diff
    }
    else gMeme.lines[lineIdx].size += diff
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
        size: 40,
        color: 'white',
        diffPos: '',
        diffPosX: '',
        txtArea: { x: '', y: '', width: '', height: '' },
        isSticker: false,
        stickerUrl: ''
    }
}

function setLineDiffPos() {
    gMeme.lines.forEach((line, i) => {
        if (i === 0 && !line.diffPos) line.diffPos = -200
        if (i === 1 && !line.diffPos) line.diffPos = 200
        if (i > 1 && !line.diffPos) line.diffPos = 0
    })
}

function switchTextLine(idx) {
    gMeme.selectedLineIdx = (!idx) ? gMeme.selectedLineIdx += 1 : idx

    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0

    return gMeme.selectedLineIdx
}

function setTextArea(x, y, width, height, idx) {
    Object.assign(gMeme.lines[idx].txtArea, { x, y, width, height })
}

function checkIfTextLineIsEmpty() {
    const lineIdxToRemove = gMeme.lines.findIndex(line => line.txt === '')

    if (lineIdxToRemove !== -1) {
        gMeme.lines.splice(lineIdxToRemove, 1)

        gMeme.selectedLineIdx = (!gMeme.selectedLineIdx) ? 0 : gMeme.selectedLineIdx - 1
    }
}

function alignText(dir) {
    const lineIdx = gMeme.selectedLineIdx

    switch (dir) {
        case 'right':
            gMeme.lines[lineIdx].diffPosX = 50
            break
        case 'center':
            gMeme.lines[lineIdx].diffPosX = 0
            break
        case 'left':
            gMeme.lines[lineIdx].diffPosX = -50
            break
    }
}

function moveText(dir) {
    const lineIdx = gMeme.selectedLineIdx

    switch (dir) {
        case 'up':
            if (gMeme.lines[lineIdx].isSticker) {
                gMeme.lines[lineIdx].txtArea.y -= 5
            } else gMeme.lines[lineIdx].diffPos -= 5
            break

        case 'down':
            if (gMeme.lines[lineIdx].isSticker) {
                gMeme.lines[lineIdx].txtArea.y += 5
            } else gMeme.lines[lineIdx].diffPos += 5
            break
    }

}

function deleteLine() {
    console.log('before', gMeme.selectedLineIdx)
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = (!gMeme.selectedLineIdx) ? 0 : gMeme.selectedLineIdx - 1

    console.log('after', gMeme.selectedLineIdx)
}

function updateIsSticker(url) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isSticker = true
    gMeme.lines[lineIdx].stickerUrl = url
    console.log(url)
    console.log('hi')
}




