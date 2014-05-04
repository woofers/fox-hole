//Jaxson Van Doorn, 2014

var game = new Phaser.Game(1368, 768, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });

function preload() {

    //Background and UI
    game.load.image('bg', 'assets/images/backgrounds/level1/level.png');
    game.load.image('pauseScreen', 'assets/images/ui/pause.png')
    
    //Platform Masks
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('logMask', 'assets/images/platform2.png');

    //Player
    game.load.spritesheet('playerSprite', 'assets/images/yoshi_sheet.png', 200, 200, 4);

    //Goomba
    game.load.spritesheet('goombaSprite', 'assets/images/yoshi_sheet.png', 200, 200, 4);

    

    var player = {
                      movingRight: false,
                      movingLeft: false,
                      dobuleJump: false,
                      inAir: false,
                      spaceTap: false
                      
                      };
    var platforms;

}

function create() {

    //Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Draw Background
    game.add.sprite(0, 0, 'bg');

    //Groups ground and other platforms
    platforms = game.add.group();
    
    //Enable Physics on platform
    platforms.enableBody = true;
    
    //Create Platfrom
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    var log = platforms.create(880, 572, 'logMask');
    
    //Prevents player from falling through platform
    ground.body.immovable = true;
    log.body.immovable = true;

    //Draw Player
    player = game.add.sprite(200, 400, 'playerSprite');

    //Add Physics on to the player
    game.physics.arcade.enable(player);

    //Physics Properties
    player.body.bounce.y = 0;
    player.body.gravity.y = 550;
    player.body.collideWorldBounds = true;

    //Player Animations
    player.animations.add('walkingLeft', [0, 1], 8, true);
    player.animations.add('walkingRight', [2, 3], 8, true);

    player.animations.add('jumpingLeft', [0], 8, true);
    player.animations.add('jumpingRight', [2], 8, true);

    //Controlls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    unPauseButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    //Scale to screen
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    //Fullscreen on click
    game.input.onDown.add(gofull, this);

    //Calls unpause function to start looping
    unPause();

}

function update() {

    //Colide
    game.physics.arcade.collide(player, platforms);

    //Reset Velocity
    player.body.velocity.x = 0;

    //Left
    if (cursors.left.isDown)
    {
        
        player.movingRight = false;
        player.movingLeft = true;
        player.body.velocity.x = -350;

        if(player.body.touching.down)
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

        if(player.body.touching.down)
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
    if (jumpButton.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -550;
        
    }

    //Double Jump
    if (cursors.up.isDown && player.inAir === true && player.dobuleJump === false && !player.body.touching.down)
    {
        player.dobuleJump = true;
        player.body.velocity.y = -550;

    }

    //Check if in air
    if (player.body.touching.down)
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
        pauseImage = game.add.sprite(0, 0, 'pauseScreen');
        this.game.paused = true;
    }

}

//Keeps listening for unpause key
function unPause(){
    
    //Unpause
    if (unPauseButton.isDown)
    {
      this.game.paused = false;
      pauseImage.kill();
    }

    //Refreshs function 60 times a second
    setTimeout(unPause, 1000 / 60);

}

function gofull() {

    game.scale.startFullScreen();

}

//Jaxson Van Doorn, 2014