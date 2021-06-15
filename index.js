let startBtn = document.querySelector('.start-btn')
let pauseBtn = document.querySelector('.pause-btn')
let showScore = document.querySelector('h1')
let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302f29'
let ctx = canvas.getContext('2d')
let chitrisGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
let activeShape = {}
let activeState = 0
let counter = 0
let style = "pink"
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false, pause = false, canMove = true
let score = 0
showScore.innerHTML = score
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
        }
    
    })
    !check ? callback() : null
    return check ? blockStore() : null 
}

function createShape () {
    activeShape = new Shape(collectionShapes[Math.floor(Math.random() * 3)])
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
        position : (750 - block.y) / 50
    })
    updateGrid(block.y)
    
})
    storedBlocks.sort((a,b) => a.y > b.y ? 1 : ((b.y > a.y) ? -1 : 0)) 
    // console.log(storedBlocks)
    activeState = 0
    // console.log(storedBlocks)
}
function updateGrid(block){
    chitrisGrid[(750 - block) / 50 ] += 50
    chitrisCheck()
}
function chitrisCheck(){
    chitrisGrid.forEach((row, index) => {
        if (row == 500){
            chitrisGrid.splice(index, 1)
            score += 100
            showScore.innerHTML = score
            let filterBlocks = storedBlocks.filter((block) =>{
                return block.position != index
            })

            storedBlocks = filterBlocks
            
            storedBlocks.forEach((block) => {
                if (block.position > index){
                    console.log(block.position)
                    block.position  -= 1
                    console.log(block.position)
                    block.y += 50

                }
            })
        }
    })
}
// score checker => splice... 

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

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    counter++;

    counter === 60 ? (dropActiveShape(), counter = 0)  : null;
    activeState == 0 ? createShape() : drawShape(activeShape);
    moveActiveBlock()
    collisionBottom(collisionBlocks)
    drawStored()
    

    intervalId = requestAnimationFrame(draw)
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