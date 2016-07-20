const Game = require('./game');
const GameDrawer = require('./game-drawer');

draw();
document.body.onkeydown = function (event) {
    if (event.key != ' ' && Game.isOver()) {
        return;
    }

    try {
        switch (event.key) {
            case 'ArrowUp':
                Game.moveUp();
                break;
            case 'ArrowDown':
                Game.moveDown();
                break;
            case 'ArrowLeft':
                Game.moveLeft();
                break;
            case 'ArrowRight':
                Game.moveRight();
                break;
            case ' ':
                location.reload();
                break;
        }
        draw();
    } catch (e) {
        if (e === 'Game Over') {
            document.getElementById('status-bar').innerHTML = '<h1>Game Over!</h1>'
        }
    }
};

function draw() {
    document.getElementById('game-field').innerHTML = GameDrawer.tableView(Game.matrix);
    document.getElementById('score').innerHTML = '<div style="margin: 25px 0; font-size: 25px">Your score: <b>' + Game.score() + '</b></div>';
}
