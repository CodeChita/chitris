function borderScreen(){
    ctx.beginPath()
    ctx.fillStyle = '#EEEBEB'
    ctx.fillRect(0, 0, canvas.width, 50)
    ctx.font = "30px Arial";
    ctx.fillStyle = '#979797'
    ctx.fillText(`score: ${score}`, 15, 35);
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
    ctx.closePath()
} 

function startScreen(){
    ctx.beginPath()
        ctx.fillStyle = '#EEEBEB'
        ctx.fillRect(50, 250, (canvas.width - 100) , 400)
    

}