export default class InputHandler {
    constructor(snake, game) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                // move left
                case 65:
                case 37:
                    game.start();
                    snake.moveLeft();
                    break;
                // move right
                case 68:
                case 39:
                    game.start();
                    snake.moveRight();
                    break;
                // move up
                case 87:
                case 38:
                    game.start();
                    snake.moveUp();
                    break;
                // move down
                case 83:
                case 40:
                    game.start();
                    snake.moveDown();
                    break;
                // pause
                case 27:
                case 80:
                    game.togglePause();
                    break;
                // reset
                case 82:
                    game.reset();
                    break;
            }
        })
    }
}