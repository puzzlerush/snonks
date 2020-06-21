export default class InputHandler {
    constructor(snake) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                // move left
                case 65:
                case 37:
                    snake.moveLeft();
                    break;
                // move right
                case 68:
                case 39:
                    snake.moveRight();
                    break;
                // move up
                case 87:
                case 38:
                    snake.moveUp();
                    break;
                // move down
                case 83:
                case 40:
                    snake.moveDown();
                    break;
            }
        })
    }
}