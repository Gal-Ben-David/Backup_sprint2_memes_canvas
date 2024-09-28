'use strict'

var gStickers = [...Array(6)]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [createLine()]
}

var gDemoMemes = [{
    selectedImgId: 23,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Me after one productive hour:',
        size: 23,
        color: 'white',
        txtArea: { x: 30, y: 100, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    }, {
        txt: 'I deserve a snack, a break,',
        size: 25,
        color: 'white',
        txtArea: { x: 30, y: 650, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    },
    {
        txt: 'and maybe a vacation',
        size: 30,
        color: 'white',
        txtArea: { x: 30, y: 700, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    }
    ]
},
{
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [{
        txt: 'When your teacher asks',
        size: 25,
        color: 'white',
        txtArea: { x: 30, y: 380, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    }, {
        txt: 'for your opinion',
        size: 25,
        color: 'white',
        txtArea: { x: 30, y: 410, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    }, {
        txt: 'and you weren’t',
        size: 25,
        color: 'white',
        txtArea: { x: 30, y: 440, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    },
    {
        txt: 'paying attention',
        size: 25,
        color: 'white',
        txtArea: { x: 30, y: 470, width: '', height: '' },
        isSticker: false,
        stickerUrl: '',
        isDrag: false
    },
    ]
}
]

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

function getFlexibleMeme() {
    const randIdx = getRandomInt(0, 2)
    gMeme = { ...gDemoMemes[randIdx] }

    return gMeme
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

function addTextLine(isSticker, url) {
    //checkIfTextLineIsEmpty()
    const newLine = createLine()

    console.log(isSticker)

    if (isSticker) {
        newLine.isSticker = true
        newLine.size = 100
        newLine.stickerUrl = url
        newLine.txt = ''
    }

    gMeme.lines.push(newLine)
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
        if (i === 0 && !posY) line.txtArea.y = gCanvas.height - (gCanvas.height * 0.85)
        if (i === 1 && !posY && !line.isSticker) line.txtArea.y = gCanvas.height * 0.85
        if (i === 1 && !posY && line.isSticker) line.txtArea.y = gCanvas.height / 2
        if (i > 1 && !posY) line.txtArea.y = gCanvas.height / 2
    })
}

function switchTextLine(idx) {
    gMeme.selectedLineIdx = (idx === undefined) ? gMeme.selectedLineIdx += 1 : idx

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
            gMeme.lines[lineIdx].txtArea.x = gCanvas.width - gMeme.lines[lineIdx].txtArea.width - padding
            break
        case 'center':
            gMeme.lines[lineIdx].txtArea.x = (gCanvas.width - gMeme.lines[lineIdx].txtArea.width) / 2
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

function setSavedMemeToCanvas(idx) {
    const savedMemes = loadFromStorage('memes') || []

    gMeme.selectedImgId = savedMemes[idx].selectedImgId
    gMeme.selectedLineIdx = savedMemes[idx].selectedLineIdx
    gMeme.lines = savedMemes[idx].lines
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

function alignAllLinesToCenter() {
    gMeme.lines.forEach(line => {
        line.txtArea.x = (gCanvas.width - line.txtArea.width) / 2
        line.txtArea.y = (gCanvas.height - line.txtArea.height) / 2
    })
}

function changeAllLinesFontSize() {
    gMeme.lines.forEach(line => {
        line.size = (line.isSticker) ? 60 : 30
    })
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




