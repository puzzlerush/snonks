class Block {
    constructor(game) {
        this.gWidth = game.gWidth;
        this.gHeight = game.gHeight;
        this.block_size = 25;
        this.color = '#000';
        this.position = [
            {
                x: 0,
                y: 0
            }
        ];
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.position.length; i++) {
            ctx.fillRect(this.position[i].x, this.position[i].y, 
                         this.block_size, this.block_size);
        }
    }
    
}

export class Snake extends Block {
    constructor(game) {
        super(game)
        this.color = '#0f0';
        this.speed = {
            x: 0,
            y: 0
        };
        
        this.direction;
        this.dead = false;
        
        this.position = [
            {
                x: (game.gWidth - this.block_size) / 2,
                y: (game.gHeight - this.block_size) / 2
            }
        ];
    }
    
    moveLeft() {
        if (this.direction != 'right') {
            this.direction = 'left';
            this.speed.x = -this.block_size;
            this.speed.y = 0;
            
        }
    }
    
    moveRight() {
        if (this.direction != 'left') {
            this.direction = 'right';
            this.speed.x = this.block_size;
            this.speed.y = 0;
        }
        
    }
    
    moveUp() {
        if (this.direction != 'down') {
            this.direction = 'up';
            this.speed.x = 0;
            this.speed.y = -this.block_size;
        }
        
    }
    
    moveDown() {
        if (this.direction != 'up') {
            this.direction = 'down';
            this.speed.x = 0;
            this.speed.y = this.block_size;
        }
        
    }
    
    checkCollision(lead) {
        for (let i = 1; i < this.position.length; i++) {
            if (this.position[i].x == lead.x && this.position[i].y == lead.y) {
                this.dead = true;
            }
        }
    }
    
    checkOffScreen(lead) {
        if (lead.x < 0) {
            lead.x = this.gWidth - this.block_size;
        } else if (lead.x >= this.gWidth) {
            lead.x = 0;
        } else if (lead.y < 0) {
            lead.y = this.gHeight - this.block_size;
        } else if (lead.y >= this.gHeight) {
            lead.y = 0;
        }
        return lead;
    }
    
    update() {
        let leadingPos = {
            x: this.position[0].x + this.speed.x,
            y: this.position[0].y + this.speed.y
        };
        
        leadingPos = this.checkOffScreen(leadingPos);
        
        this.position.unshift(leadingPos);
        this.position.pop();
        this.checkCollision(leadingPos);
        
    }
}

export class Snack extends Block {
    constructor(game) {
        super(game);
        this.color = '#f00';
        this.relocate(game.snake);
    }
    
    relocate(snake) {
        this.position[0].x = Math.floor(Math.random() * this.gWidth / this.block_size) * this.block_size;
        this.position[0].y = Math.floor(Math.random() * this.gHeight / this.block_size) * this.block_size;
        
        for (let i = 0; i < snake.position.length; i++) {
            if (snake.position[i].x == this.position[0].x && 
                snake.position[i].y == this.position[0].y) {
                this.relocate(snake);
            }
        }
    }
    
    checkEaten(snake) {
        if (this.position[0].x == snake.position[0].x && 
            this.position[0].y == snake.position[0].y) {
            snake.position.unshift({x: this.position[0].x, y: this.position[0].y});
            this.relocate(snake);
        }
    }
}