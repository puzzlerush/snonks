import {Snake, Snack} from './snake.js';
import InputHandler from './input.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    
    constructor(gWidth, gHeight) {
        this.gWidth = gWidth;
        this.gHeight = gHeight;
        this.gamestate = GAMESTATE.MENU;
        this.snake = new Snake(this);
        this.snack = new Snack(this);
        new InputHandler(this.snake, this);
    }
    
    start() {
        this.gamestate = GAMESTATE.RUNNING;
    }
    
    update() {
        if (this.snake.dead) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }
        
        if (this.gamestate == GAMESTATE.PAUSED || 
            this.gamestate == GAMESTATE.MENU || 
            this.gamestate == GAMESTATE.GAMEOVER) {
            return;
        }
        this.snake.update();
        this.snack.checkEaten(this.snake);
    }
    
    draw(ctx) {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        this.snake.draw(ctx);
        this.snack.draw(ctx);
        ctx.font = '24px ff6';
        ctx.fillStyle = 'black';
        ctx.fillText(`Length: ${this.snake.position.length}`, 2 * this.snake.block_size, this.snake.block_size);
        
        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gWidth, this.gHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill();
            ctx.shadowColor = 'black';
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.font = '48px ff6';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gWidth / 2, this.gHeight / 2);
        } else if (this.gamestate == GAMESTATE.MENU) {
            ctx.font = '30px Verdana';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#AAA';
            ctx.fillText('WASD or Arrow Keys to Move', this.gWidth / 2, this.gHeight / 2);
        } else if (this.gamestate == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gWidth, this.gHeight);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fill();
            ctx.font = '30px Verdana';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000';
            ctx.fillText('You Died', this.gWidth / 2, this.gHeight / 2);
            ctx.font = '16px Verdana';
            ctx.fillText('Press R to play again', this.gWidth / 2, this.gHeight / 2 + this.snake.block_size);
        }
    }
    
    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else if (this.gamestate == GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
    
    reset() {
        this.gamestate = GAMESTATE.MENU;
        this.snake = new Snake(this);
        this.snack = new Snack(this);
        new InputHandler(this.snake, this);
    }
}