//Jaxson C. Van Doorn, 2014

var playerFunctions = {};

playerFuntions = function(game){};

playerFunctions.prototype = {

    loadPlayer : function(){

        //Draw Player
        player = game.add.sprite(sav.x, 930, 'playerSprite');
        player.anchor.setTo(0.5, 1);
        player.scale.setTo(4, 4);
        player.smoothed = false;

        //Add Physics
        game.physics.arcade.enable(player);
        
        //Physics Properties
        player.body.bounce.y = 0;
        player.body.gravity.y = 700;
        player.body.collideWorldBounds = true;

        //Player Animations

            //Walk
            player.animations.add('idleLeft', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);
            player.animations.add('idleRight', Phaser.Animation.generateFrameNames('foxIdle', 0, 15, '', 4), 10, true);

            //Idle
            player.animations.add('walkingLeft', Phaser.Animation.generateFrameNames('foxRunning', 0, 6, '', 4), 10, true);
            player.animations.add('walkingRight', Phaser.Animation.generateFrameNames('foxRunning', 0, 6, '', 4), 10, true);

            //Jump
            player.animations.add('jumpingLeft', Phaser.Animation.generateFrameNames('foxRunning', 0, 0, '', 4), 10, true);
            player.animations.add('jumpingRight', Phaser.Animation.generateFrameNames('foxRunning', 0, 0, '', 4), 10, true);

            //Crawl
            player.animations.add('crawlLeft', Phaser.Animation.generateFrameNames('foxCrawl', 0, 3, '', 4), 10, true);
            player.animations.add('crawlRight', Phaser.Animation.generateFrameNames('foxCrawl', 0, 3, '', 4), 10, true);

            //Crawl Idle
            player.animations.add('crawlIdleLeft', Phaser.Animation.generateFrameNames('foxCrawl', 0, 0, '', 4), 10, true);
            player.animations.add('crawlIdleRight', Phaser.Animation.generateFrameNames('foxCrawl', 0, 0, '', 4), 10, true);

            //Diging
            player.animations.add('digLeft', Phaser.Animation.generateFrameNames('foxDig', 0, 17, '', 4), 10, false);
            player.animations.add('digRight', Phaser.Animation.generateFrameNames('foxDig', 0, 17, '', 4), 10, false);
    },

    digDelayFunc : function(){

        digDelay = game.time.now; 
        player.isDigging = true;
    },

    tunnel1 : function(){

        tunnel1.fill(9, layerTunnel1.getTileX(player.x - player.directX), layerTunnel1.getTileY(player.y - 128), 3, 1);
    },

    tunnel2 : function(){

        tunnel2.fill(11, layerTunnel2.getTileX(player.x - player.directX), layerTunnel2.getTileY(player.y - 128), 3, 1);
    }
};

//Jaxson C. Van Doorn, 2014