class Stock {
    stockman;
    widthInCells;
    heightInCells;
    map;
    points;
    constructor(widthInCells, heightInCells, map) {
        this.points = [];
        this.heightInCells = heightInCells;
        this.widthInCells = widthInCells;
        this.map = new Array(heightInCells).fill("0").map(()=> new Array(widthInCells).fill("0"));
        for (let y = 0; y < heightInCells; y++) {
            for (let x = 0; x < widthInCells; x++) {
                var index = x + y*widthInCells;
                    if (map[index] == '@') {
                        this.stockman = new Stockman(this, x, y);
                    } else if (map[index] == '.') {
                        this.points.push(new Point(x, y, this));
                    }
                    this.map[y][x] = map[index];
            }
        }
    }
    getMapElement(x, y) {
        return this.map[y][x];
    }
    setMapElement(x, y, value) {
        this.map[y][x] = value;
    }


}