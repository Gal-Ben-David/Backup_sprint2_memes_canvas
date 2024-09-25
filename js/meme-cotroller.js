'use strict'

let gCanvas
let gContext

function onInit() {
    gCanvas = document.querySelector('canvas')
    gContext = gCanvas.getContext('2d')

    //setLineTxt()
    setLineDiffPos()
    setImagesInArray()
    renderGallery()
    renderMeme()

    gCanvas.addEventListener('click', handleClick)
}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        meme.lines.forEach((line, i) => createTextLine(line, i))
    }
}

function createTextLine(line, i) {
    gContext.lineWidth = 3
    gContext.strokeStyle = line.color
    gContext.strokeStyle = line.color

    // const rectWidth = 300
    // const rectHeight = 60
    // const x = (gCanvas.width / 2) - (rectWidth / 2)
    // const y = (gCanvas.height / 2) - (rectHeight / 2) + line.diffPos

    //gContext.strokeRect(x, y, rectWidth, rectHeight)
    //gContext.strokeRect(x, y, rectWidth, rectHeight)

    setTextInLine(gCanvas.width / 2, gCanvas.height / 2, line, i)
}

function setTextInLine(x, y, line, i) {
    gContext.font = `bold ${line.size}px Arial`
    gContext.fillStyle = line.color

    const text = line.txt.toUpperCase()

    const textWidth = gContext.measureText(text).width
    const textHeight = line.size

    const textX = x - (textWidth / 2)
    const textY = y + line.diffPos

    // console.log('Clicked Position: ', 'x:', x, 'y:', y);
    // console.log('Calculated Text Position: ', 'textX:', textX, 'textY:', textY);

    gContext.fillText(text, textX, textY)

    setTextArea(textX, textY, textWidth, textHeight, i)

    console.log
}

function handleClick(ev) {
    const meme = getMeme()
    const clickX = ev.offsetX
    const clickY = ev.offsetY + 10

    console.log('evX', clickX, 'evY', clickY)

    // const currLineTextArea = meme.lines[meme.selectedLineIdx]

    meme.lines.forEach((line, i) => {

        if (
            clickX >= line.txtArea.x &&
            clickX <= line.txtArea.x + line.txtArea.width &&
            clickY >= line.txtArea.y &&
            clickY <= line.txtArea.y + line.txtArea.height + 10
        ) {
            switchTextLine(i)
            document.querySelector('.text').value = meme.lines[i].txt
            drawFrame()
            console.log('clicked')
        }
    })
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
    const lastTextLineIdx = addTextLine()
    switchTextLine(lastTextLineIdx)

    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx
    document.querySelector('.text').value = meme.lines[currLineIdx].txt

    renderMeme()
    drawFrame()
}

function onSwitchTextLine() {
    switchTextLine()

    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx
    document.querySelector('.text').value = meme.lines[currLineIdx].txt

    drawFrame()
}

function drawFrame() {
    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx

    const rectWidth = 300
    const rectHeight = 60
    const x = (gCanvas.width / 2) - (rectWidth / 2)
    const y = (gCanvas.height / 2) - (rectHeight / 2) + meme.lines[currLineIdx].diffPos

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        meme.lines.forEach((line, i) => createTextLine(line, i))

        gContext.strokeStyle = 'white'
        gContext.lineWidth = 3
        gContext.strokeRect(x, y, rectWidth, rectHeight)
    }
}

function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

