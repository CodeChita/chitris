let startTxt = `bla 
bla bla`
function borderScreen(){
    ctx.beginPath()
    ctx.fillStyle = '#EEEBEB'
    ctx.fillRect(0, 0, canvas.width, 50)
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillStyle = '#979797'
    ctx.fillText(`score: ${score}`, 15, 37);
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
        ctx.fillStyle = '#EEEBEB'
        ctx.fillRect(50, 250, (canvas.width - 100) , 400)
        ctx.fillStyle = '#979797'
        ctx.textAlign = "center"
        ctx.fillText(`bla bla bla`, 250, 350);
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
        ctx.fillText(`Your score is `, 250, 350);
        ctx.fillText(`${score} `,250, 400);
    ctx.closePath()
    
}
function scoreCheck(){
    score < 200 ? explorer.play() : pablo.play()
}