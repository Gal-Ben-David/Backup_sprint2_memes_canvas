'use strict'

var gStickers = [...Array(6)]
var gSavedMemes = []

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [createLine()]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


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

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = text
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
        size: 30,
        color: 'white',
        txtArea: { x: '', y: '', width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    }
}

function setLineDiffPos() {
    gMeme.lines.forEach((line, i) => {
        const posY = line.txtArea.y
        if (i === 0 && !posY) line.txtArea.y = 73
        if (i === 1 && !posY) line.txtArea.y = 473
        if (i > 1 && !posY) line.txtArea.y = 273
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
    const padding = 10

    switch (dir) {
        case 'right':
            gMeme.lines[lineIdx].txtArea.x = 546 - gMeme.lines[lineIdx].txtArea.width - padding
            break
        case 'center':
            gMeme.lines[lineIdx].txtArea.x = (546 - gMeme.lines[lineIdx].txtArea.width) / 2
            break
        case 'left':
            gMeme.lines[lineIdx].txtArea.x = padding
            console.log(gMeme.lines[lineIdx].txtArea.x)
            break
    }
}

function moveText(dir) {
    const lineIdx = gMeme.selectedLineIdx

    switch (dir) {
        case 'up':
            gMeme.lines[lineIdx].txtArea.y -= 5
            break

        case 'down':
            gMeme.lines[lineIdx].txtArea.y += 5
            break
    }
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = (!gMeme.selectedLineIdx) ? 0 : gMeme.selectedLineIdx - 1
}

function updateIsSticker(url) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isSticker = true
    gMeme.lines[lineIdx].size = 100
    gMeme.lines[lineIdx].stickerUrl = url
}

function setSavedMemeToCanvas(idx) {
    const savedMemes = loadFromStorage('memes') || []

    gMeme.selectedImgId = savedMemes[idx].selectedImgId
    gMeme.selectedLineIdx = savedMemes[idx].selectedLineIdx
    gMeme.lines = savedMemes[idx].lines
}

function isLineClicked(clickedPos) {
    const lineIdx = gMeme.selectedLineIdx
    const posX = gMeme.lines[lineIdx].txtArea.x
    const posY = gMeme.lines[lineIdx].txtArea.y

    //* Calc the distance between two dots
    const distance = Math.sqrt((posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2)
    //* If its smaller then the radius of the circle, we know we clicked inside the circle
    return distance <= gMeme.lines[lineIdx].size
}

function setLineDrag(isDrag) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txtArea.x += dx
    gMeme.lines[lineIdx].txtArea.y += dy
}

function changeSelectedImgIdx() {
    gMeme.selectedImgId = -1
}


async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}




