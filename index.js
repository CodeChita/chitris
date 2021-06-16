let startBtn = document.querySelector('.start-btn')
let pauseBtn = document.querySelector('.pause-btn')
var audio = new Audio('./soundbites/backgroundbeat.wav')
let showScore = document.querySelector('h1')
let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#707070'
let ctx = canvas.getContext('2d')
let chitrisGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
let activeShape = {}
let activeState = 0
let counter = 0
let style = ["#FF5733",'#C4FC1A', '#86FF33', '#FFFC33', '#33FFDC', '#33A9FF', '#4933FF', '#A233FF', '#E633FF', '#FF33E3', '#FF33E3']
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false, pause = false, canMove = true
let killGame = false
let score = 0


showScore.innerHTML = score
function drawShape (shape){
    shape.blocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.strokeStyle = '#707070'
        ctx.rect(block.x, block.y, block.width, block.height)
        ctx.stroke()
        ctx.closePath()
        })
} 
function drawStored (){
    storedBlocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = block.style
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.rect(block.x, block.y, block.width, block.height)
        ctx.closePath()
        })
}
function dropActiveShape() {
    activeShape.blocks.forEach((block) => {
        block.y += 50
        drawShape(activeShape)
    })
}

function collisionBottom (callback){
    collisionTop ()
    let check = false
    activeShape.blocks.forEach((block) => {
        if (block.y + block.height >= canvas.height){
            check = true
        }
    
    })
    !check ? callback() : null
    return check ? blockStore() : null 
}

function collisionTop (){
    let topRow = storedBlocks.filter((block) => block.position == 14)
    if (topRow.length !== 0){
        activeShape.blocks.forEach((block) => {
            for(let i = 0; i < topRow.length; i++){
                if (block.x == toprow[i].x){
                    killGame = true
                }
            }
        })
    }

}

function createShape () {
    activeShape = new Shape(collectionShapes[Math.floor(Math.random() * collectionShapes.length)])
    activeState = 1
    drawShape(activeShape)
}

function blockStore() {
    activeShape.blocks.forEach((block) =>{
    storedBlocks.push({
        x : block.x,
        y : block.y,
        width : block.width,
        height : block.height,
        position : ((canvas.height - 50) - block.y) / 50, 
        style : style[Math.floor(Math.random() * style.length)]
    })
    updateGrid(block.y)
    
})
    storedBlocks.sort((a,b) => a.y > b.y ? 1 : ((b.y > a.y) ? -1 : 0)) 
    activeState = 0
}
function updateGrid(block){
    chitrisGrid[(750 - block) / 50 ] += 50
    chitrisCheck()
}
function chitrisCheck(){
    chitrisGrid.forEach((row, index) => {
        if (row == 500){
            chitrisGrid.splice(index, 1)
            chitrisGrid.push(0)
            score += 100
            showScore.innerHTML = score
            let filterBlocks = storedBlocks.filter((block) =>{
                return block.position != index
            })
            storedBlocks = filterBlocks
            
            storedBlocks.forEach((block) => {
                block.style = style[Math.floor(Math.random() * style.length)]
                if (block.position > index){
                    block.position  -= 1
                    block.y += 50

                }
            })
        }
    })
}

function collisionBlocks(){
    let check = false
    activeShape.blocks.forEach((block) => {
        storedBlocks.forEach((storedBlock) => {
            if(block.y + block.height == storedBlock.y && block.x == storedBlock.x){
                return check = true
            }
            if(check){
                return check
            }
        })
    })
    return check ? blockStore(activeShape) : null 
}


function checkborders(direction){
    activeShape.blocks.forEach((block) => {
        if (direction == 'left' && block.x == 0){
            return canMove = false
        }
        else if (direction == 'right' && block.x + block.width == canvas.width){
            return canMove = false
        }
        else if (direction == 'down' && block.x + block.height == canvas.height){
            return canMove = false
        }
    })
    return canMove
}

function moveActiveBlock(){
    
    if (isLeft && checkborders("left")){
        activeShape.blocks.forEach((block) => block.x -= 50)
    }
    else if (isRight && checkborders("right")){
        activeShape.blocks.forEach((block) => block.x += 50)
    }
    else if (isDown && checkborders("down")){
        activeShape.blocks.forEach((block) => block.y += 50)
    }
        isLeft = false
        isRight = false
        isDown = false
        canMove = true
}

function drawStroke(){
    ctx.beginPath()
    ctx.strokeStyle = 'pink'
    ctx.rect(0, 50, canvas.width, canvas.height)
    ctx.stroke()
}
function draw(){
    audio.play()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawStroke()
    counter++;

    counter === 40 ? (dropActiveShape(), counter = 0)  : null;
    activeState == 0 ? createShape() : drawShape(activeShape);
    moveActiveBlock()
    collisionBottom(collisionBlocks)
    drawStored()
    collisionTop () // LOOK AT THIS

    
    if (killGame){
        cancelAnimationFrame(intervalId)
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
}
    


window.addEventListener('load', () => {
    startBtn.addEventListener('click', () => draw())
    pauseBtn.addEventListener('click',() => {
        !pause ? (cancelAnimationFrame(intervalId), pause = true) : (draw(), pause = false)
    })
    document.addEventListener('keydown', (event) => {
        if (event.code == 'ArrowRight') {
            isRight = true
            isLeft = false
            isDown = false 
        }
        else if (event.code == 'ArrowLeft') {
            isRight = false
            isLeft = true
            isDown = false 
        }
        else if (event.code == 'ArrowDown') {
            isRight = false
            isLeft = false
            isDown = true
        }
    })

    // draw()
    // audio.play()
})