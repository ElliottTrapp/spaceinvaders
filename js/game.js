var score = 0;

var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}


//Addition of .score
Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;                                   // This determines how fast the aliens move once one has been killed
  this.board.remove(this); 
        // This functions defines that the alien is then removed upon collision 
    score = score +1;
        // Adds 10 to the score
    document.getElementById('score').innerHTML="  : " + score;
                        
}

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}
//This is the firing rate for the Alien - Random Number * 100 =< 10 will fire.
//Maybe can change 'missle' to 'missle2' and add new sprite to change their projectile.
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 5) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 110 });
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}


Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}
//Change speed of player?

Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

// Here you can change the amount of missiles on the board - before requring a reload (waiting for the missiles to reach end of canvas)

  this.reloading--;
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 3) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

//If I change between missile and missile 2 - the sprite will now change for both the player and alien

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile2', this.x,this.y);
}

//Missile.prototype.draw = function(canvas) {
//   Sprites.draw(canvas,'missile2',this.x,this.y);
//}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

//If enemy missile collides with player - player dies and game ends
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}



//zak


var BossAlien = function BossAlien (opts) 

{ this.dx = opts.dx; 
 this.frame = 0;
 this.player= opts.player; }

BossAlien.prototype.draw = function(canvas) 
{ Sprites.draw(canvas, 'triforce', this.x, this.y, this.frame);}

BossAlien.prototype.step = function(dt)
{ this.x += this.dx;
 this.frame = (this.frame+1) % 2; 
 return true; } 

BossAlien.prototype.die = function() {
    GameAudio.play('');
    this.board.remove(this);
    this.player.frame=1;
    
    
    
}         
