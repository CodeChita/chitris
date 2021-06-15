let startBtn = document.querySelector('.start-btn')
let pauseBtn = document.querySelector('.pause-btn')
let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302f29'
let ctx = canvas.getContext('2d')

let activeShape = {}
let activeState = 0
let counter = 0
let style = "pink"
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false, pause = false, canMove = true

function drawShape (shape){
    shape.blocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.strokeStyle = 'red'
        ctx.rect(block.x, block.y, block.width, block.height)
        ctx.stroke()
        ctx.closePath()
        })
} 
function drawStored (){
    storedBlocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'pink'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.strokeStyle = 'red'
        ctx.rect(block.x, block.y, block.width, block.height)
        ctx.stroke()
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
    let check = false
    activeShape.blocks.forEach((block) => {
        if (block.y + block.height >= canvas.height){
            check = true
            // activeState = 0
            // console.log('collision', block)
        //    return blockStore()
        }
    
    })
    !check ? callback() : null
    return check ? blockStore() : null 
}

function createShape () {
    activeShape = new Shape(collectionShapes[Math.floor(Math.random() * 3)])
    // console.log('createShape: ', activeShape)
    activeState = 1
    drawShape(activeShape)    
}

function blockStore() {
    // console.log(activeShape.blocks)
    activeShape.blocks.forEach((block) =>{
    // console.log(block)
    storedBlocks.push({
        x : block.x,
        y : block.y,
        width : block.width,
        height : block.height
    })
})
   activeState = 0
   console.log(storedBlocks)
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

// sort stored blocks 
// storedBlocks.sort()
// console.log(storedBlocks)

// score checker => splice... 

function checkborders(direction){
    
    activeShape.blocks.forEach((block) => {
        if (direction == 'left' && block.x == 0){
            return canMove = false
        }
        else if (direction == 'right' && block.x + block.width == canvas.width){
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
    else if (isDown){
        activeShape.blocks.forEach((block) => block.y += 50)
    }
        isLeft = false
        isRight = false
        isDown = false
        canMove = true
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    counter++;

    counter === 60 ? (dropActiveShape(), counter = 0)  : null;
    activeState == 0 ? createShape() : drawShape(activeShape);
    moveActiveBlock()
    collisionBottom(collisionBlocks)
    drawStored()
    

    intervalId = requestAnimationFrame(draw)
        // if(intervalId == 2000){
        //     console.log("end")
        //     cancelAnimationFrame(intervalId)
        // } 
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
})