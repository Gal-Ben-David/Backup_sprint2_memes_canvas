'use strict'

let gCanvas
let gContext
let gSwitchOn


function onInit() {
    gCanvas = document.querySelector('canvas')
    gContext = gCanvas.getContext('2d')

    gSwitchOn = false

    setLineTxt('')
    setLineDiffPos()
    setImagesInArray()
    renderGallery()
    renderMeme()

}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        meme.lines.map(line => createTextLine(line))
        //createTextLine(meme)
    }
}

function createTextLine(line) {
    gContext.lineWidth = 3
    gContext.strokeStyle = line.color

    const rectWidth = 300
    const rectHeight = 60
    // const x = (gCanvas.width / 2) - (rectWidth / 2)
    // const y = (gCanvas.height / 2) - (rectHeight / 2) + line.diffPos

    //gContext.strokeRect(x, y, rectWidth, rectHeight)

    setTextInLine(gCanvas.width / 2, gCanvas.height / 2, line)
}

function setTextInLine(x, y, line) {
    gContext.font = `bold ${line.size}px Arial`
    gContext.fillStyle = line.color

    const text = line.txt.toUpperCase()
    const textWidth = gContext.measureText(text).width
    const textX = x - (textWidth / 2)
    const textY = y + line.diffPos

    gContext.fillText(text, textX, textY)
}


function onGetText(elText) {
    setLineTxt(elText)
    renderMeme()
}

function onImgSelect(imgIdx = 1) {
    getImgUrlById(imgIdx)
    renderMeme()
}

function onChangeTextSize(elDiff) {
    changeTextSize(elDiff)
    renderMeme()
}

function onChangeTextColor() {
    const elColor = document.querySelector('.txt-color').value
    changeTextColor(elColor)
    renderMeme()
}

function onAddTextLine() {
    addTextLine()
    renderMeme()
}

function onSwitchTextLine() {
    gSwitchOn = true
    switchTextLine()
    drawFrame()
}

function drawFrame() {
    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx

    const rectWidth = 300
    const rectHeight = 60
    const x = (gCanvas.width / 2) - (rectWidth / 2)
    const y = (gCanvas.height / 2) - (rectHeight / 2) + meme.lines[currLineIdx].diffPos

    gContext.clearRect(x - 5, y - 5, rectWidth + 10, rectHeight + 10)

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        // Redraw all text lines
        meme.lines.forEach(line => createTextLine(line))

        gContext.strokeStyle = 'white'
        gContext.lineWidth = 3
        gContext.strokeRect(x, y, rectWidth, rectHeight)
    }
}

function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
