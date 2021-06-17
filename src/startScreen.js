let startTxt = [`welcome to tetris!`, `made by @codechita`, `feat. George, Pablo,`,`Manish and Jules`]
let img = new Image()
img.src = './img/logo.png'
function borderScreen(){
    ctx.beginPath()
    ctx.fillStyle = '#EEEBEB'
    ctx.fillRect(0, 0, canvas.width, 50)
    ctx.font = "20px 'Press Start 2P'";
    ctx.textAlign = "center"
    ctx.fillStyle = '#979797'
    ctx.fillText(`score: ${score}`, 250, 37);
    ctx.fillStyle = '#E7DEDE'
    ctx.fillRect(canvas.width - 50, 0, 50, 50)
    ctx.closePath()
    ctx.beginPath();
    ctx.moveTo(canvas.width - 40, 10);
    ctx.lineTo(canvas.width - 10, 40);
    ctx.lineWidth = 2
    ctx.stroke();
    ctx.closePath()
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, 10);
    ctx.lineTo(canvas.width - 40, 40);
    ctx.stroke();
    ctx.closePath()
} 

function startScreen(){
    ctx.beginPath()
    ctx.drawImage(img, 100, 350, 200, 200)
    ctx.fillStyle = '#EEEBEB'
    ctx.fillRect(50, 250, (canvas.width - 100) , 400)
    ctx.fillStyle = '#979797'
    ctx.textAlign = "center"
    ctx.fillText(startTxt[0], 250, 300);
    ctx.drawImage(img, 115, 310, 250, 250)
    ctx.font = "10px 'Press Start 2P'"
    ctx.fillText(startTxt[1], 250, 600);
    ctx.fillText(startTxt[2], 250, 615);
    ctx.fillText(startTxt[3], 250, 630);
    ctx.closePath()
}

function endScreen(){
    ctx.beginPath()
    ctx.globalAlpha = 0.50;
    ctx.fillStyle = '#979797'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath()
    ctx.beginPath()
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#EEEBEB'
    ctx.fillRect(50, 250, (canvas.width - 100) , 400)
    ctx.fillStyle = '#979797'
    ctx.textAlign = "center"
    ctx.fillText(`Your score is `, 250, 400);
    ctx.fillText(`${score} `,250, 430);
    ctx.closePath()
    }
function scoreCheck(){
    score < 300 ? explorer.play() : pablo.play()
}