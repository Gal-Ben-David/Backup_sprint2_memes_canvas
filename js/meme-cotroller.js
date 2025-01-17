'use strict'
let gUserImgSrc = null
var gClickedFromGallery = false

let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function hideEditor() {
    const elEditor = document.querySelector('.editor')
    const elEditorBtn = document.querySelector('.memes-btn')

    elEditor.style.display = 'none'
    elEditorBtn.classList.remove('open')
}

function showEditor() {
    const elEditor = document.querySelector('.editor')
    const elEditorBtn = document.querySelector('.memes-btn')

    elEditor.style.display = 'flex'
    elEditorBtn.classList.add('open')
}

function renderMeme() {
    if (gClickedSavedBtn) {
        document.querySelector('.tools-saved-btn').innerHTML = '<i class="fa-regular fa-bookmark"></i>'
        gClickedSavedBtn = false
    }

    const meme = (gIsFlexibleMode) ? getFlexibleMeme() : getMeme()
    gIsFlexibleMode = false

    const img = new Image()

    if (!gUserImgSrc) {
        const imgIdx = meme.selectedImgId
        img.src = getImgUrlById(imgIdx)
    } else img.src = gUserImgSrc

    if (gClickedFromGallery) {
        onShowEditor()
        gClickedFromGallery = false
    }

    img.onload = () => {
        resizeCanvas(img)

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
    const pos = getEvPos(ev)

    meme.lines.forEach((line, i) => {

        if (
            isLineClicked(pos, line)
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

    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx
    document.querySelector('.text').value = (!isSticker) ? meme.lines[currLineIdx].txt : ''

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

    console.log('isDrag', meme.lines[currLineIdx].isDrag)

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

    if (!gUserImgSrc) {
        const imgIdx = meme.selectedImgId
        img.src = getImgUrlById(imgIdx)
    } else img.src = gUserImgSrc

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

    const strHtmls = stickers.map(sticker => `<img src="${sticker.url}" onclick="onAddTextLine(true, '${sticker.url}')"/>`)
    elStickers.innerHTML = strHtmls.join('')
}

function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function isLineClicked(clickedPos, currLine) {

    const posX = currLine.txtArea.x
    const posY = currLine.txtArea.y

    if (currLine.isSticker) {
        const distance = Math.sqrt((posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2)
        return distance <= currLine.size

    } else if (
        clickedPos.x >= Math.round(+posX) &&
        clickedPos.x <= Math.round(posX + currLine.txtArea.width) &&
        clickedPos.y >= posY - 20 &&
        clickedPos.y <= posY + currLine.txtArea.height
    )
        return true
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const meme = getMeme()

    meme.lines.forEach((line, i) => {
        if (isLineClicked(pos, line)) {
            switchTextLine(i)
            document.querySelector('.text').value = meme.lines[i].txt
            drawFrame()
            setLineDrag(true)
            console.log('clicked')
        }
    })

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
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvasforMq()
        renderMeme()
    })

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
    gClickedFromGallery = true
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
    resizeCanvas(img)

    gUserImgSrc = img.src
    renderMeme()
}

function resizeCanvasforMq() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function resizeCanvas(img) {
    gCanvas.height = (img.naturalHeight / img.naturalWidth) * gCanvas.width
    gCanvasDimensions.height = gCanvas.height
    gCanvasDimensions.width = gCanvas.width
}




