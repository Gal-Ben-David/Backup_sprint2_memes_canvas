'use strict'
let gUserImg = null

let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

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
    if (gClickedSavedBtn) {
        document.querySelector('.tools-saved-btn').innerHTML = '<i class="fa-regular fa-bookmark"></i>'
        gClickedSavedBtn = false
    }

    const meme = getMeme()

    const img = new Image()

    if (!gUserImg) {
        const imgIdx = meme.selectedImgId
        img.src = getImgUrlById(imgIdx)
    } else img.src = gUserImg

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
            // const width = (line.txtArea.width) ? line.txtArea.width : line.size
            // const height = (line.txtArea.height) ? line.txtArea.height : line.size

            gContext.drawImage(sticker, xPos, yPos, line.size, line.size)
            setTextArea(xPos, yPos, line.size, line.size, i)
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
    const textY = line.txtArea.y

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
    gUserImg = null
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
    const lastTextLineIdx = addTextLine(isSticker, url)
    switchTextLine(lastTextLineIdx)

    if (!isSticker) {
        const meme = getMeme()
        const currLineIdx = meme.selectedLineIdx
        document.querySelector('.text').value = meme.lines[currLineIdx].txt
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
        y = meme.lines[currLineIdx].txtArea.y - meme.lines[currLineIdx].txtArea.height - padding / 1.5
    }
    const radius = 20

    const img = new Image()

    if (!gUserImg) {
        const imgIdx = meme.selectedImgId
        img.src = getImgUrlById(imgIdx)
    } else img.src = gUserImg

    img.onload = () => {
        gContext.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        drawRoundedRect(gContext, x, y, rectWidth, rectHeight, radius)

        meme.lines.forEach((line, i) => createTextLine(line, i))
    }
}

function drawRoundedRect(gContext, x, y, width, height, radius) {
    gContext.lineWidth = 1.8
    gContext.strokeStyle = '#ffffff'
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
    gContext.stroke()
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

function onDown(ev) {
    const pos = getEvPos(ev)

    if (!isLineClicked) return

    setLineDrag(true)

    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx
    const { isDrag } = meme.lines[currLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y

    moveLine(dx, dy)

    gLastPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function addListeners() {
    gCanvas.addEventListener('click', handleClick)
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
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

function onImgInput(ev) {
    changeSelectedImgIdx()
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {

    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    //gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gUserImg = img.src
    renderMeme()
}



