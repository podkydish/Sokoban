const widthOfCell = 40;
var stocks = [];
var currentLevel = 0;
var canvas;
var context;
var stock;
stocks.push(new Stock(22, 11, "    XXXXX                 X   X                 X*  X               XXX  *XXX             X  *  * X           XXX X XXX X     XXXXXXX   X XXX XXXXXXX  ..XX *  *             ..XXXXXX XXXX X@XXXX  ..X    X      XXX  XXXXXX    XXXXXXXX          "))
stocks.push(new Stock(14, 10, "XXXXXXXXXXXX  X..  X     XXXX..  X *  *  XX..  X*XXXX  XX..    @ XX  XX..  X X  * XXXXXXXX XX* * X  X *  * * * X  X    X     X  XXXXXXXXXXXX"))
stocks.push(new Stock(17, 10, "        XXXXXXXX         X     @X         X *X* XX         X *  *X          XX* * X  XXXXXXXXX * X XXXX....  XX *  *  XXX...    *  *   XX....  XXXXXXXXXXXXXXXXXX         "))
stock = stocks[currentLevel];
var stockman = stock.stockman;
initGameField(stock);
function initGameField(stock) {
    var fieldWidth = stock.widthInCells * widthOfCell;
    var fieldHeight = stock.heightInCells * widthOfCell;
    canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    canvas.width = fieldWidth;
    canvas.height = fieldHeight;
    for (var y = 0; y <= stock.heightInCells; y++) {
        context.beginPath();
        context.moveTo(0, y * widthOfCell);
        context.lineTo(fieldWidth, y * widthOfCell);
        context.stroke();
        context.strokeStyle = "black";
        context.fill();
    }
    for (var x = 0; x <= stock.widthInCells; x++) {
        context.beginPath();
        context.moveTo(x * widthOfCell, 0);
        context.lineTo(x * widthOfCell, fieldHeight);
        context.stroke();
        context.strokeStyle = "black";
        context.fill();
    }
    drawGameField(stock, context, widthOfCell);
}
document.addEventListener('keydown', function (e) {
    stock = stocks[currentLevel];
    stockman = stocks[currentLevel].stockman;
    var countOfDonePoints = 0;
    stock.points.forEach(element => {
        if (element.isFill) {
            countOfDonePoints++;
        }
    });
    currentY = stockman.y;
    currentX = stockman.x;
    if (e.which === 87 |e.which ===38) {

        if (stock.getMapElement(currentX, currentY - 1) != 'X' && stock.getMapElement(currentX, currentY - 1) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.y=currentY - 1;
            stock.setMapElement(currentX, currentY - 1, '@');
        } else if (stock.getMapElement(currentX, currentY - 1) == '*' && stock.getMapElement(currentX, currentY - 2) != 'X' && stock.getMapElement(currentX, currentY - 2) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.y = currentY - 1;
            stock.setMapElement(currentX, currentY - 1, '@');
            stock.setMapElement(currentX, currentY - 2, '*');
        }
    }
    else if (e.which === 83|e.which ===40) {
        if (stock.getMapElement(currentX, currentY + 1) != 'X' && stock.getMapElement(currentX, currentY + 1) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.y=currentY + 1;
            stock.setMapElement(currentX, currentY + 1, '@');
        } else if (stock.getMapElement(currentX, currentY + 1) == '*' && stock.getMapElement(currentX, currentY + 2) != 'X' && stock.getMapElement(currentX, currentY + 2) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.y= currentY + 1;
            stock.setMapElement(currentX, currentY + 1, '@');
            stock.setMapElement(currentX, currentY + 2, '*');
        }
    }
    else if (e.which === 65|e.which ===37) {
        if (stock.getMapElement(currentX - 1, currentY) != 'X' && stock.getMapElement(currentX - 1, currentY) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.x =currentX - 1;
            stock.setMapElement(currentX - 1, currentY, '@');
        } else if (stock.getMapElement(currentX - 1, currentY) == '*' && stock.getMapElement(currentX - 2, currentY) != 'X' && stock.getMapElement(currentX - 2, currentY) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.x=currentX - 1;
            stock.setMapElement(currentX - 1, currentY, '@');
            stock.setMapElement(currentX - 2, currentY, '*');
        }
    }
    else if (e.which === 68|e.which ===39) {
        if (stock.getMapElement(currentX + 1, currentY) != 'X' && stock.getMapElement(currentX + 1, currentY) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.x=currentX + 1;
            stock.setMapElement(currentX + 1, currentY, '@');
        } else if (stock.getMapElement(currentX + 1, currentY) == '*' && stock.getMapElement(currentX + 2, currentY) != 'X' && stock.getMapElement(currentX + 2, currentY) != '*') {

            stock.setMapElement(currentX, currentY, ' ');
            stockman.x=currentX + 1;
            stock.setMapElement(currentX + 1, currentY, '@');
            stock.setMapElement(currentX + 2, currentY, '*');
        }
    }
    stock.points.forEach(element => {
        if (stock.getMapElement(element.x, element.y) == '*') {
            element.isFill=true;
        } else {
            element.isFill=false;
        }
    });
    if (countOfDonePoints == stock.points.length) {
        context.clearRect(0, 0, screen.width, screen.height);
        currentLevel++;
        initGameField(stocks[currentLevel]);
    } else {
        drawGameField(stock, context, widthOfCell);
    }
});
function drawGameField(stock, context, widthOfCell) {
    for (y = 0; y < stock.heightInCells; y++) {

        for (x = 0; x < stock.widthInCells; x++) {

            drawCell(x, y, widthOfCell, context, stock.getMapElement(x, y));
        }
    }
    stock.points.forEach(function (element) {
        x = element.x;
        y = element.y;
        if (stock.getMapElement(x, y) == ' ') {
            drawCell(x, y, widthOfCell, context, ".");
        }
    });
}
function drawCell(x, y, widthOfCell, context, element) {
    var color;
    switch (element) {
        case "@": { color = "#FFDAB9"; break; }
        case "*": { color = "#FF4500"; break; }
        case ".": { color = "grey"; break; }
        case " ": { color = "white"; break; }
        case "X": { color = "black"; break; }
    }
    context.fillStyle = color;
    context.fillRect(x * widthOfCell, y * widthOfCell, widthOfCell - 2, widthOfCell - 2);
    context.stroke();
}