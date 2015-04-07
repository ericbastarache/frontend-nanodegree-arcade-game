// Enemies our player must avoid

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

//Collision handling is done here
var checkCollisions = function(){

  //First check to see if the player is within the bounds of the game
    if(player.x > 402){
      player.x = 402;
    }
    else if (player.x < 2){
      player.x = 2;
    }
    else if(player.y > 400){
      player.y = 400;
    }
    else if (player.y <= 0){
      reset();
    }

  //Next check to see if any enemies are colliding with our player
    for(var i = 0; i < allEnemies.length; i++){
      var enemy = allEnemies[i];

      /*If the x value is less than the enemy x value + the width of the enemy minus 25px
        And the player x value + the width of the player minus 25px  is greater than the enemy x value
        And the player y value is less than the enemy y value + the height of the enemy minus 86px
        And the player height minus 86px + player y value greater than enemy y value then we
        Reset the game*/
      if(player.x < enemy.x + (enemy.width - 25) && player.x + (player.width - 25) > enemy.x && player.y < enemy.y + (enemy.height - 86) && (player.height - 86) + player.y > enemy.y){
        alert("Game Over");
        reset();
      }
    }
}

//Reset the game
var reset = function(){
  //Resets the player location back to the starting position
    player.x = 202;
    player.y = 400;
}

function getRandomY(){
  var yVals = [60, 145, 230];
  return yVals[Math.floor(Math.random() * yVals.length)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){
      for(var i = 0; i < allEnemies.length; i++){
        this.x -= this.speed;
        lastY = this.y;

        //60, 145, 230

        if(allEnemies[i].y == lastY){
          allEnemies[i].y = getRandomY();
        }

        /*if(allEnemies[0].y == allEnemies[1].y || allEnemies[0].y == allEnemies[2].y){
          allEnemies[0].y = getRandomY();

        }
        else if(allEnemies[1].y == allEnemies[0].y || allEnemies[1].y == allEnemies[2].y){
          allEnemies[1].y = getRandomY();

        }
        else if(allEnemies[2].y == allEnemies[0].y || allEnemies[2].y == allEnemies[1].y){
          allEnemies[2].y = getRandomY();

        }*/
      }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function(){
    this.x = 202;
    this.y = 400;
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;

}

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function(keys){
    switch(keys){
      case 'left':
        this.x -= 100;
        console.log(this.x, this.y);
        break;
      case 'right':
        this.x += 100;
        console.log(this.x, this.y);
        break;
      case 'up':
        this.y -= 85;
        console.log(this.x, this.y);
        break;
      case 'down':
        this.y += 85;
        console.log(this.x, this.y);
        break;
      default:
        break;

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];

allEnemies[0]= new Enemy(0, 60);
allEnemies[1] = new Enemy(0, 145);
allEnemies[2] = new Enemy(0, 230);

//Sets the individual speed of our enemies
allEnemies[0].speed = 300;
allEnemies[1].speed = 600;
allEnemies[2].speed = 500;

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
