class Shape {
    constructor(blocksData){
        this.blocks = []
        // console.log(blocksData)
        blocksData.forEach(data => {
            // console.log(data)
            this.blocks.push(new Block(data.x, data.y, data.width, data.height))
        });
    }
}