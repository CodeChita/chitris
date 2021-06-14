let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302f29'
let ctx = canvas.getContext('2d')

let activeShape = {}
let activeState = 0
let counter = 0
let style = "pink"
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false;

function drawShape (shape){
    shape.blocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.fillStyle = 'pink'
        ctx.rect(block.x, block.y, block.width, block.height)
        ctx.stroke()
        ctx.closePath()
        })
} 
function drawStored (){
    storedBlocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.fillStyle = 'pink'
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

function collisionBottom (){
    activeShape.blocks.forEach((block) => {
        if (block.y + block.height >= canvas.height){
            activeState = 0
           return blockStore(activeShape)
        }
    })
}


function createShape () {
    activeShape = new Shape(collectionShapes[Math.floor(Math.random() * 3)])
    activeState = 1
    drawShape(activeShape)    
}
function blockStore(shape) {
   activeShape.blocks.forEach((block) =>{
    storedBlocks.push({
        x : block.x,
        y : block.y,
        width : block.width,
        height : block.height
    })
   })
}

// sort stored blocks 

// score checker => splice... 

function moveActiveBlock(){
    if (isLeft == true ){
        activeShape.blocks.forEach((block) => block.x -= 50)
        isLeft = false
    }
    else if (isRight == true){
        activeShape.blocks.forEach((block) => block.x += 50)
        isRight = false
    }
    else if (isDown == true){
        activeShape.blocks.forEach((block) => block.y += 50)
        isDown = false
    }
}


function collisionBlocks(){
    activeShape.blocks.forEach((block) => {
        storedBlocks.forEach((storedBlock) => {
            if(block.y + block.height == storedBlock.y && block.x == storedBlock.x){
                activeState = 0
                return blockStore(activeShape)
            }
        })
    })
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    counter++;
    // console.log('hello')

    if (counter === 30 ){
        console.log(counter)
        dropActiveShape()
        counter = 0
        
    }
    activeState == 0 ? createShape() : drawShape(activeShape);

    collisionBottom()
    collisionBlocks ()
    drawStored()
  
    moveActiveBlock()

    intervalId = requestAnimationFrame(draw)
        if(intervalId == 2000){
            console.log("end")
            cancelAnimationFrame(intervalId)
        } 
}
    


window.addEventListener('load', () => {
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
    draw()
})