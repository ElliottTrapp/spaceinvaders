
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,2,2,0,0,0,0],
          [0,0,0,0,0,1,1,0,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,3,3,3,3,3,3,3,0,0],
          [0,0,3,3,3,3,3,3,3,0,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,1,1,1,1,1,1,1,2,0],
          [1,0,0,0,0,0,0,0,0,0,0],
          [1,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]]};

//This is the positioning of the elements in the game

  var spriteData = {
    //Zelda Alien 1 = Octorok
    'alien1': { sx: 0,  sy: 0,  w: 32, h: 30, cls: Alien, frames: 2 },
    //'alien2': { sx: 0,  sy: 22, w: 23, h: 18, cls: Alien, frames: 0 },
    'triforce': { sx: 66,  sy: 0,  w: 34, h: 30, cls: BossAlien,frames: 2},
    'player': { sx: 0,  sy: 30, w: 25, h: 37, cls: Player },
    'missile': { sx: 0,  sy: 67, w: 7,  h: 15, cls: Missile },
    'missile2': { sx: 6,  sy: 68, w: 8,  h: 8, cls: Missile },
  }

  function startGame() {
    var screen = new GameScreen("Alien Invaders","press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("Game Over","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     score = 0;
                                     document.getElementById('score').innerHTML=" : " + score;
                                 
                                 });
    Game.loadBoard(screen);
  }




    function winGame() {
    var screen = new GameScreen("You Win!","(press space to restart)",                              // This represents what is shown when you beat all 3 levels and win the game 
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     score = 0;
                                     document.getElementById('score').innerHTML=" : " + score;
                                 });
    Game.loadBoard(screen);
  }

//This is the function that controls the sounds for firing and kills
//Could add enemy firing by adding another line of code 'fire2' : 'media/laser2.wav', etc.

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.wav', 'die' : 'media/explosion.wav' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



