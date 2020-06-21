import {Snake, Snack} from './snake.js';
import InputHandler from './input.js';

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 625;
const GAME_HEIGHT = 625;
let fps = 15;
let fpsInterval = 1000 / fps;
let elapsed, now;
let last = 0;

let snake = new Snake(GAME_WIDTH, GAME_HEIGHT);
let snack = new Snack(GAME_WIDTH, GAME_HEIGHT);
snack.relocate(snake);
new InputHandler(snake);

function gameLoop(timestamp) {
    now = timestamp;
    elapsed = now - last;
    if (elapsed > fpsInterval) {
        last = now;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        snake.update();
        snack.checkEaten(snake);
        snake.draw(ctx);
        snack.draw(ctx);
    }
    requestAnimationFrame(gameLoop);
    
}

requestAnimationFrame(gameLoop);