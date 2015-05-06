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

    } else if (player.x < 2){
      player.x = 2;

    } else if(player.y > 400){
      player.y = 400;

    } else if (player.y <= 0){
      player.score += 100;
      resetPlayer();
    }

  //Next check to see if any enemies are colliding with our player
    for(var i = 0; i < allEnemies.length; i++){
      var enemy = allEnemies[i];

      /* If the player intersects with an enemy on the x or y axis (subtraction of 25px from width
       * and 86px from used for better collision detection) then we reset the game
       */
      if(player.x < enemy.x + (enemy.width - 25) && player.x + (player.width - 25) > enemy.x && player.y < enemy.y + (enemy.height - 86) && (player.height - 86) + player.y > enemy.y){
        var alertContent = "Game Over: \nFinal Score: " + player.score;
        alert(alertContent);
        resetPlayer();
      }
    }

    //Check to see if our player collides with any gems, and if so we want to
    //1. Update the score to reflect the number of points collected for each color gem
    //2. Remove the gem from play
    //Again the g variable stands for the object(s) in use, in this case gems
    for(var g = 0; g < gems.length; g++){
      var gem = gems[g];

      if(player.x < gem.x + (gem.width - 25) && player.x + (player.width - 25) > gem.x && player.y < gem.y + (gem.height - 86) && (player.height - 86) + player.y > gem.y){
        if(gem.sprite == 'images/Gem-Blue.png'){
          player.score = parseInt(player.score + 20);
          gems.splice(g, 1);
        } else if(gem.sprite == 'images/Gem-Green.png'){
          player.score = parseInt(player.score + 30);
          gems.splice(g, 1);
        } else if(gem.sprite == 'images/Gem-Orange.png'){
          player.score = parseInt(player.score + 50);
          gems.splice(g, 1);
        }

      }
    }

}


//Reset the game
var resetPlayer = function(){
  //Resets the player location back to the starting position
    player.x = 202;
    player.y = 400;
  //Repopulates the board with gems
    populateGems();
};


//Generate a random y position for the enemy
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

    if(this.x > (505 + this.width)){
      for(var i = 0; i < allEnemies.length; i++){
        this.x -= this.speed;
        this.y = getRandomY();

      }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function(x, y){

    this.x = x;
    this.y = y;
    this.score = 0;
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/char-boy.png';

};

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

//Gems class

var Gems = function(x, y){
    this.x = randXtraX();
    this.y = randXtraY();
    this.width = 101;
    this.height = 171;

    var randGem = ['images/Gem-Blue.png', 'images/Gem-Green.png', 'images/Gem-Orange.png'];
    var gem = randGem[Math.floor(Math.random() * randGem.length)];

    this.sprite = gem;
};


Gems.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gems.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;

}

var randXtraX = function(){
    var randX = [2, 102, 202, 302, 402];
    var gemX = randX[Math.floor(Math.random() * randX.length)];

    return gemX;
};
var randXtraY = function(){
    var randY = [60, 145, 230];
    var gemY = randY[Math.floor(Math.random() * randY.length)];

    return gemY;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202, 400);
var allEnemies = [];

// Place all gem objects in an array called gems
var gems = [];


//Creates our enemies at each possible x, y coordinate
allEnemies[0]= new Enemy(0, 60);
allEnemies[1] = new Enemy(0, 145);
allEnemies[2] = new Enemy(0, 230);

//Gem generation method(easer to instantiate gems objects through a loop than individual declaration)
//Variable g stands for gems
var populateGems = function(){
  for(var g = 0; g < 2; g++){
    gems[g] = new Gems();
  }
};

populateGems();
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
