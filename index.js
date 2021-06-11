let canvas = document.querySelector('canvas')
// arr =[]
canvas.style.backgroundColor = '#302f29'
let ctx = canvas.getContext('2d')
let squareX = 0, squareY = 0, squareWidth = 50, squareHeigth = 50
let counter = 0
let storedBlocks = []
 function drawBlock (){
        ctx.beginPath()
        ctx.fillStyle = 'pink'
        ctx.fillRect(squareX, squareY, squareWidth, squareHeigth )
        ctx.closePath()
    }
function collision (){
    if (squareY + squareHeigth > canvas.height - 1){
        let storeBlk = {
            x : squareX,
            y : squareY
        }
        storedBlocks.push(storeBlk)
        console.log(storedBlocks)
        squareX += 100;
        squareY = 0;
    }
}

function drawStored(){
    storedBlocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'pink'
        ctx.fillRect(block.x, block.y, squareWidth, squareHeigth )
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
    drawBlock()
    collision()
    drawStored()
    
        // console.log('hello')
        intervalId = requestAnimationFrame(draw)
        if(intervalId == 1000){
            cancelAnimationFrame(intervalId)
        }
    // }   
}
    


window.addEventListener('load', () => {
    draw()
    
})