let startBtn = document.querySelector('.start-btn')
let endBtn = document.querySelector('.end-btn')
let audioBackground = new Audio('./soundbites/backgroundbeat.wav')
let yeahSound = new Audio('./soundbites/test.m4a')
let matchaSound = new Audio('./soundbites/matcha.m4a')
let explorer = new Audio('./soundbites/explorer.m4a')
let pablo = new Audio('./soundbites/pablo.m4a')
audioBackground.volume = 0.1
yeahSound.volume = 0.8
explorer.volume = 1
let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#DCD5D3'
let ctx = canvas.getContext('2d')
let chitrisGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let activeShape = {}
let activeState = 0
let counter = 0
let style = ["#FF5733",'#C4FC1A', '#86FF33', '#FFFC33', '#33FFDC', '#33A9FF', '#4933FF', '#A233FF', '#E633FF', '#FF33E3', '#FF33E3']
let storedBlocks = []
let isLeft = false, isRight = false, isDown = false, pause = false, canMove = true, startGame = true, restart = false
let killGame = false
let score = 0


function drawShape (shape){
    shape.blocks.forEach((block) => {
        ctx.beginPath()
        ctx.fillStyle = 'rgb(151, 151, 151)'
        ctx.fillRect(block.x, block.y, block.width, block.height)
        ctx.strokeStyle = '#DCD5D3'
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
        ctx.strokeStyle = '#DCD5D3'
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
                if (block.x == topRow[i].x){
                    killGame = true
                }
            }
        })
    }

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
            yeahSound.play()
            chitrisGrid.splice(index, 1)
            chitrisGrid.push(0)
            score += 100
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

function createShape () {
    activeShape = new Shape(collectionShapes[Math.floor(Math.random() * collectionShapes.length)])
    activeState = 1
    drawShape(activeShape)
}

function draw(){
    ctx.clearRect(0, 50, canvas.width, canvas.height)
    borderScreen()
    audioBackground.play()
    counter++;

    counter === 40 ? (dropActiveShape(), counter = 0)  : null;
    activeState == 0 ? createShape() : drawShape(activeShape);
    moveActiveBlock()
    collisionBottom(collisionBlocks)
    drawStored()

    if (killGame){
        cancelAnimationFrame(intervalId)
        scoreCheck()    
        endScreen()
        if (!restart){
            restart = true
            endBtn.innerHTML = 'new game'
            startGame = false
            startBtn.innerHTML = "pause"
        }
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
}

function gameRestart(){
    ctx.clearRect(0, 50, canvas.width, canvas.height)
    borderScreen()
    startScreen()
    chitrisGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    activeShape = {}
    activeState = 0
    counter = 0
    matchaSound.play()
    startBtn.innerHTML = "start"
    storedBlocks = []
    score = 0
    draw()
    startGame = false
}

window.addEventListener('load', () => {
    borderScreen()
    startScreen()
    startBtn.addEventListener('click', () => {
        if (startGame){
            startBtn.innerHTML = "pause"
            matchaSound.play()
            draw()
            startGame = false
        }
        else {
            !startGame ? (cancelAnimationFrame(intervalId), startGame = true, startBtn.innerHTML = "resume") : (draw(), startGame = false)
        }

    })
    endBtn.addEventListener('click',() => {
        
        if (!restart){
            killGame = true
            restart = true
            endBtn.innerHTML = 'new game'
        }
        else {
            restart = false 
            killGame = false
            gameRestart()

        }
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
})