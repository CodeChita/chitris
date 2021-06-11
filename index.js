let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302f29'
let ctx = canvas.getContext('2d')
let squareX = 0, squareY = 0, squareWidth = 50, squareHeight = 50
let counter = 0
let style = "pink"
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false;
 function drawBlock (){
        ctx.beginPath()
        ctx.fillStyle = style
        ctx.fillRect(squareX, squareY, squareWidth, squareHeight )
        ctx.closePath()
    }
function collisionBottom (){
    if (squareY + squareHeight > canvas.height - 50){
        let storeBlk = {
            x : squareX,
            y : squareY,
            width : squareWidth,
            height : squareHeight
        }
        storedBlocks.push(storeBlk)
        console.log(storedBlocks)
        squareX += 0;
        squareY = 0;
    }
}
function moveActiveBlock(){
    if (isLeft == true){
        squareX -= 50
        isLeft = false
    }
    else if (isRight == true){
        squareX += 50 
        isRight = false
    }
    else if (isDown == true){
        squareY += 50
        isDown = false
    }
}


function collisionBlocks (){
    storedBlocks.forEach((block) => {
        if (block.x == squareX && squareY + squareHeight >= block.y){
            let storeBlk = {
                x : squareX,
                y : squareY,
                width : squareWidth,
                height : squareHeight
            }
            storedBlocks.push(storeBlk)
            
        }
    })
}

function drawStored(){
    storedBlocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'pink'
        ctx.fillRect(block.x, block.y, squareWidth, squareHeight )
        ctx.closePath()
    })
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    counter++
    

    if (counter === 10  ){
        counter = 0
        squareY += 50

    }
    moveActiveBlock()
    collisionBottom()
    collisionBlocks()
    drawBlock()
    drawStored()
    
        // console.log('hello')
        intervalId = requestAnimationFrame(draw)
        if(intervalId == 1000){
            console.log("end")
            cancelAnimationFrame(intervalId)
        }
    // }   
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