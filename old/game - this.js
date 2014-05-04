//Jaxson C. Van Doorn, 2014

var MainGame = {};

MainGame = function(game){};

MainGame.prototype = {
	
    preload : function(){

        //Loading Screen
        this.add.sprite(0, 0, 'loadingScreen');

        //Background and UI
        this.load.image('bg', 'assets/images/backgrounds/level1/level.png');
        this.load.image('pauseScreen', 'assets/images/ui/pause.png');

        //Map
        this.load.tilemap('map', 'assets/images/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/map/empty.png');

        //Player
        this.load.spritesheet('playerSprite', 'assets/images/fox_big.png', 335, 275, 31);

        //Player Varibles
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

	},

	create : function(){
    
        //Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Draw Background
        this.add.sprite(0, 0, 'bg');

        //Loads title map
        map = this.add.tilemap('map');

        //Draws map to screen
        map.addTilesetImage('block', 'tiles');
        layer = map.createLayer('1');

        //Map collision
        map.setCollisionBetween(0, 40);

        //Set camera boundaries
        this.world.setBounds(0, 0, 5472, 768);

        //Draw Player
        player = this.add.sprite(200, 400, 'playerSprite');

        //Add Physics on to the player
        this.physics.arcade.enable(player);

        //Physics Properties
        player.body.bounce.y = 0;
        player.body.gravity.y = 550;
        player.body.collideWorldBounds = true;

        //Player Animations
    
        //Walk
        player.animations.add('walkingLeft', [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ], 10, true);
        player.animations.add('walkingRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ], 10, true);

        //Jump
        player.animations.add('jumpingLeft', [16], 8, true);
        player.animations.add('jumpingRight', [0], 8, true);

        //Controlls
        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        unPauseButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //Camera follow player
        this.camera.follow(player);

        //Fullscreen on click
        this.input.onDown.add(MainGame.prototype.gofull, this);

        //Calls unpause function to start looping
        MainGame.prototype.unPause();


	},

	update : function(){
    
        //Colide
        this.physics.arcade.collide(player, layer);

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
                    player.frame = 16;
                }

                if(player.movingRight === true){
                    player.frame = 0;
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
            pauseImage = this.add.sprite(0, 0, 'pauseScreen');
            pauseImage.fixedToCamera = true;
        
            //Pauses Gane
            game.paused = true;
        }

	},

	unPause : function(){

        //Unpause
        if (unPauseButton.isDown)
        {
            //Unpauses Game
            game.paused = false;
      
            //Undraws Pause Screen
            pauseImage.kill();
        }

        //Refreshs function 60 times a second
        setTimeout(MainGame.prototype.unPause, 1000 / 120);
	},

	gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.maxWidth = 1920;
        game.scale.maxHeight = 1080;

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.startFullScreen();

	}

};

//Jaxson C. Van Doorn, 2014
