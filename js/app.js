//Border Dimensions  
var TopBorder = 0;
var BottonBorder = 400;
var RightBorder = 400;
var LeftBorder = 0; 
var WaterLine = 50;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
this.sprite = 'images/sasquach.png';
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = Math.floor(Math.random()*200) + 65;
    this.speed = Math.floor(Math.random()*200) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
        
    // resets the enemies once they reach the end of the canvas 
        if (this.x > 505) {
            this.reset();
        }
};

Enemy.prototype.reset = function () {
    this.x = -100;
    this.y = Math.floor(Math.random()*200) + 65;
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
this.x = 200;
this.y = 400;
this.sprite = 'images/char-boy.png';
};

player.prototype.update = function() {
//checks for collisions
for (var enemy in allEnemies) {
if (this.x <= allEnemies[enemy].x + 50 && this.x >= allEnemies[enemy].x -50 && this.y <= allEnemies[enemy].y + 50 && this.y >= allEnemies[enemy].y -50) {
    this.reset();
        }
    }
};

player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keyup) {
//change position with border limitations 
 if (keyup === 'left' && this.x > LeftBorder) {
    player.x -= 40;
  }
  else if (keyup === 'right' && this.x < RightBorder) {
    player.x += 40;
  }
  else if (keyup === 'up' && this.y > TopBorder) {
    player.y -= 40;
  }
  else if (keyup === 'down' && this.y < BottonBorder) {
    player.y += 40;
  }
  //restets the sprite to the original starting position if hits the water line
  else if (this.y <= WaterLine) {
    this.reset();
  }
};

player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var en1 = new Enemy();
var en2 = new Enemy();
var en3 = new Enemy();

var allEnemies = [en1,en2,en3];
var player =   new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});