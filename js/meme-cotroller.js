'use strict'

let gCanvas
let gContext
let gText

function onInit() {
    gCanvas = document.querySelector('canvas')
    gContext = gCanvas.getContext('2d')

    setImagesInArray()
    renderGallery()
    renderMeme()

}

function renderMeme() {
    const meme = getMeme()

    gText = meme.lines[0].txt

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        createTextLine()
    }
}

function createTextLine() {
    gContext.lineWidth = 3
    gContext.strokeStyle = 'white'

    const rectWidth = 300
    const rectHeight = 60
    const x = (gCanvas.width / 2) - (rectWidth / 2)
    const y = (gCanvas.height / 2) - (rectHeight / 2) - 200

    gContext.rect(x, y, rectWidth, rectHeight)
    gContext.stroke()

    setTextInLine(x, y, rectWidth, rectHeight)
}

function setTextInLine(x, y, rectWidth, rectHeight) {
    gContext.font = '20px Arial'
    gContext.fillStyle = 'white'

    const text = gText
    const textWidth = gContext.measureText(text).width
    const textX = x + (rectWidth / 2) - (textWidth / 2)
    const textY = y + (rectHeight / 2) + 10

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
