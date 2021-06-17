class Shape {
    constructor(blocksData){
        this.blocks = []
        blocksData.forEach(data => {
            this.blocks.push(new Block(data.x, data.y, data.width, data.height))
        });
    }
}