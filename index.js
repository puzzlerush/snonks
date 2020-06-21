import Game from './game.js';

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 625;
const GAME_HEIGHT = 625;
let fps = 15;
let fpsInterval = 1000 / fps;
let elapsed, now;
let last = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timestamp) {
    now = timestamp;
    elapsed = now - last;
    if (elapsed > fpsInterval) {
        last = now;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update();
        game.draw(ctx);
    }
    requestAnimationFrame(gameLoop);
    
}

requestAnimationFrame(gameLoop);