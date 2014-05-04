//Jaxson Van Doorn, 2014

var game = new Phaser.Game(1368, 768, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });

function preload() {

    //game.debug.geom(new Phaser.Rectangle(0, 0, 1368, 768),'#191919');

    var text = "LOADING...";
    var style = { 
                    font: "50px Open Sans Bold", 
                    fill: "#8f8b8b", 
                    align: "center" 
                };

    var t = game.add.text(550, 391, text, style);

    //Background and UI
    game.load.image('bg', 'assets/images/backgrounds/level1/level.png');
    game.load.image('pauseScreen', 'assets/images/ui/pause.png');

    //Map
    game.load.tilemap('map', 'assets/images/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/images/map/empty.png');

    //Player
    game.load.spritesheet('playerSprite', 'assets/images/yoshi_sheet.png', 200, 200, 4);

    //Goomba
    game.load.spritesheet('goombaSprite', 'assets/images/goomba.png', 167, 197, 4);

    var player = {
                      movingRight: false,
                      movingLeft: false,
                      dobuleJump: false,
                      inAir: false,
                      spaceTap: false
                      
                      };
    var enemy;
    
    var map;
    var layer;
    var pauseImage;

}

function create() {

    //Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Draw Background
    game.add.sprite(0, 0, 'bg');

    //Loads title map
    map = game.add.tilemap('map');

    //Draws map to screen
    map.addTilesetImage('block', 'tiles');
    layer = map.createLayer('1');

    //Map collision
    map.setCollisionBetween(0, 40);

    //Set camera boundaries
    game.world.setBounds(0, 0, 5472, 768);

    //Draw Player
    player = game.add.sprite(200, 400, 'playerSprite');

    //Draw Goomba
    enemy = game.add.sprite(600, 400, 'goombaSprite');

    //Add Physics on to the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(enemy);

    //Physics Properties
    player.body.bounce.y = 0;
    player.body.gravity.y = 550;
    player.body.collideWorldBounds = true;
    
    enemy.body.gravity.y = 550;
    enemy.body.bounce.y = 0;

    //Player Animations
    
    //Walk
    player.animations.add('walkingLeft', [0, 1], 8, true);
    player.animations.add('walkingRight', [2, 3], 8, true);

    //Jump
    player.animations.add('jumpingLeft', [0], 8, true);
    player.animations.add('jumpingRight', [2], 8, true);

    //Goomba Squash
    enemy.animations.add('squash', [0, 1, 2, 3, 4], 15, false);

    //Controlls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    unPauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    fullScreenButton = game.input.keyboard.addKey(Phaser.Keyboard.F);

    //Camera follow player
    game.camera.follow(player);

    //Fullscreen on click
    game.input.onDown.add(gofull, this);

    //Calls unpause function to start looping
    unPause();

}

function update() {

    //Colide
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(enemy, layer);


    //Reset Velocity
    player.body.velocity.x = 0;

    //Left
    if (cursors.left.isDown)
    {
        
        player.movingRight = false;
        player.movingLeft = true;
        player.body.velocity.x = -350;

        if(player.body.blocked.down)
        {
            player.animations.play('walkingLeft');
        }
        else
        {
           player.animations.play('jumpingLeft'); 
        }

    }

    //Right
    else if (cursors.right.isDown)
    {
        player.movingLeft = false;
        player.movingRight = true;
        player.body.velocity.x = 350;

        if(player.body.blocked.down)
        {
            player.animations.play('walkingRight');
        }
        else
        {
           player.animations.play('jumpingRight'); 
        }

    }
    
    //Still
    else
    {
        player.animations.stop();
            
            if(player.movingLeft === true){
                player.frame = 0;
            }

            if(player.movingRight === true){
                player.frame = 2;
            }
    }
    
    //Jump
    if (jumpButton.isDown && player.body.blocked.down)
    {
        player.body.velocity.y = -550;
        
    }

    //Double Jump
    if (cursors.up.isDown && player.inAir === true && player.dobuleJump === false && !player.body.blocked.down)
    {
        player.dobuleJump = true;
        player.body.velocity.y = -550;

    }

    //Check if in air
    if (player.body.blocked.down)
    {
        player.inAir = false;
        player.dobuleJump = false;

    }
    else
    {
        player.inAir = true;
    }

    //Pause
    if (pauseButton.isDown)
    {
        //Draws Pause Screen 
        pauseImage = game.add.sprite(0, 0, 'pauseScreen');
        pauseImage.fixedToCamera = true;
        
        //Pauses Gane
        this.game.paused = true;
    }

}

//Keeps listening for unpause key
function unPause(){
    
    //Unpause
    if (unPauseButton.isDown)
    {
      //Unpauses Game
      this.game.paused = false;
      
      //Undraws Pause Screen
      pauseImage.kill();
    }

    //Refreshs function 60 times a second
    setTimeout(unPause, 1000 / 60);

}

function gofull() {

    game.scale.startFullScreen();

}

//Jaxson Van Doorn, 2014
