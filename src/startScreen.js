let startTxt = [`welcome to tetris!`, `made by @codechita`, `feat. George, Pablo,`,`Manish and Jules`]
let loseText = [`"Ahh loser,` `you're as bad as`, ` INTERNET EXPLORER"`, ` - Manish`]
let winText = [`WHOOHOOOO!`, `Pablo is very`, `proud of you`]
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
    if(score < 200 ){
        ctx.fillText(loseText[0], 250, 330);
        ctx.fillText(loseText[1], 250, 360);
        ctx.fillStyle = 'red'
        ctx.font = "20px 'Press Start 2P'"
        ctx.fillText(loseText[2], 250, 390);
        ctx.font = "10px 'Press Start 2P'"
        ctx.fillStyle = '#979797'
        ctx.fillText(loseText[3], 250, 410);
    }
    else {
        ctx.font = "20px 'Press Start 2P'"
        ctx.fillStyle = 'green'
        ctx.fillText(winText[0], 250, 330);
        ctx.fillText(winText[1], 250, 360);
        ctx.fillText(winText[2], 250, 390);
    }
    ctx.fillStyle = '#979797'
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText(`Your score is `, 250, 480);
    ctx.fillText(`${score} `,250, 510);
    ctx.closePath()
    }

function scoreCheck(){
    score < 300 || score == 0  ? explorer.play() : pablo.play()
}