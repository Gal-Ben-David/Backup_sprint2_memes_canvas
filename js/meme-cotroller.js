'use strict'

function hideEditor() {
    const elEditor = document.querySelector('.editor')
    const elEditorBtn = document.querySelector('.memes-btn')

    elEditor.style.display = 'none'
    elEditorBtn.classList.remove('active')
}

function showEditor() {
    const elEditor = document.querySelector('.editor')
    const elEditorBtn = document.querySelector('.memes-btn')

    elEditor.style.display = 'flex'
    elEditorBtn.classList.add('active')
}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    onShowEditor()

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        meme.lines.forEach((line, i) => createTextLine(line, i))
    }
}

function createTextLine(line, i) {
    gContext.lineWidth = 3
    gContext.strokeStyle = line.color

    setTextInLine(gCanvas.width / 2, gCanvas.height / 2, line, i)
}

function setTextInLine(x, y, line, i) {

    if (line.isSticker) {
        const sticker = new Image()
        sticker.src = line.stickerUrl

        sticker.onload = function () {
            const xPos = (line.txtArea.x) ? line.txtArea.x : 70
            const yPos = (line.txtArea.y) ? line.txtArea.y : 90
            const width = (line.txtArea.width) ? line.txtArea.width : 100
            const height = (line.txtArea.height) ? line.txtArea.height : 100

            gContext.drawImage(sticker, xPos, yPos, width, height)
            setTextArea(xPos, yPos, width, height, i)
        }
        return
    }

    const fontFamily = document.querySelector('.font-family').value
    gContext.font = `800 ${line.size}px '${fontFamily}'`
    gContext.fillStyle = line.color

    gContext.strokeStyle = 'black'
    gContext.lineWidth = 3

    const text = line.txt.toUpperCase()

    const textWidth = gContext.measureText(text).width
    const textHeight = line.size

    const textX = (line.txtArea.x) ? line.txtArea.x : x - (textWidth / 2)
    const textY = y + line.diffPos

    gContext.fillText(text, textX, textY)
    gContext.strokeText(text, textX, textY)

    setTextArea(textX, textY, textWidth, textHeight, i)
}

function handleClick(ev) {
    const meme = getMeme()
    const clickX = ev.offsetX
    const clickY = ev.offsetY + 20

    meme.lines.forEach((line, i) => {

        console.log(+line.txtArea.x, line.txtArea.width, line.txtArea.y - 20, line.txtArea.y + line.txtArea.height)

        if (
            clickX >= Math.round(+line.txtArea.x) &&
            clickX <= Math.round(line.txtArea.x + line.txtArea.width) &&
            clickY >= line.txtArea.y - 20 &&
            clickY <= line.txtArea.y + line.txtArea.height
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

function onAddTextLine(isSticker, url) {
    const lastTextLineIdx = addTextLine()
    switchTextLine(lastTextLineIdx)

    if (!isSticker) {
        const meme = getMeme()
        const currLineIdx = meme.selectedLineIdx
        document.querySelector('.text').value = meme.lines[currLineIdx].txt

    } else {
        updateIsSticker(url)
    }
    renderMeme()
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
    var y
    const padding = 15

    const rectWidth = meme.lines[currLineIdx].txtArea.width + padding * 2
    const rectHeight = meme.lines[currLineIdx].txtArea.height + padding * 2
    const x = meme.lines[currLineIdx].txtArea.x - padding

    if (meme.lines[currLineIdx].isSticker) {
        y = meme.lines[currLineIdx].txtArea.y - padding
    } else {
        y = meme.lines[currLineIdx].txtArea.y - meme.lines[currLineIdx].txtArea.height - padding / 2
    }
    const radius = 30

    const img = new Image()
    const imgIdx = meme.selectedImgId
    img.src = getImgUrlById(imgIdx)

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        drawRoundedRect(gContext, x, y, rectWidth, rectHeight, radius)

        meme.lines.forEach((line, i) => createTextLine(line, i))
    }
}

function drawRoundedRect(gContext, x, y, width, height, radius) {
    gContext.fillStyle = '#f5f5f593'

    gContext.beginPath()
    gContext.moveTo(x + radius, y)
    gContext.lineTo(x + width - radius, y)
    gContext.quadraticCurveTo(x + width, y, x + width, y + radius)
    gContext.lineTo(x + width, y + height - radius)
    gContext.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    gContext.lineTo(x + radius, y + height)
    gContext.quadraticCurveTo(x, y + height, x, y + height - radius)
    gContext.lineTo(x, y + radius)
    gContext.quadraticCurveTo(x, y, x + radius, y)
    gContext.closePath()

    gContext.fill()
}

function onAlignText(dir) {
    alignText(dir)
    renderMeme()
}

function onMoveText(dir) {
    moveText(dir)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onChangeFontFamily() {
    renderMeme()
}

function renderStickerIcons() {
    const elStickers = document.querySelector('.stickers')
    const stickers = getStickers()

    const strHtmls = stickers.map(sticker => `<img src="${sticker.url}" onclick="onAddTextLine('true', '${sticker.url}')"/>`)
    elStickers.innerHTML = strHtmls.join('')
}

function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onUploadToFB(url) {
    console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        onUploadToFB(encodedUploadedImgUrl)
    }
    uploadImg(canvasData, onSuccess)
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

