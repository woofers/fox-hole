//Jaxson C. Van Doorn, 2014

var croc11Functions = {};

croc11Funtions = function(game){};

croc11Functions.prototype = {

    loadCroc1 : function(){

        //Create Croc1 Group
        croc1 = game.add.group(); 
        
        //Create Croc1 From Tilemap
        croc1Chilldren = topMap.createFromObjects('enemy1', 7, 'croc1Sprite', 0, true, false, croc1);

        croc1.enableBody = true;
        game.physics.arcade.enable(croc1);

        croc1.setAll('anchor.x', 0.5);
        croc1.setAll('scale.x', -2.5);
        croc1.setAll('scale.y', 2.5);

        croc1.setAll('body.bounce', 0);
        croc1.setAll('body.gravity.y', 700);
        croc1.setAll('body.collideWorldBounds', true);
        croc1.setAll('smoothed', false);

        //croc1.set(2, 'scale.x', -2.5);

        //Walk
        croc1.callAll('animations.add', 'animations', 'spin', Phaser.Animation.generateFrameNames('croc1Idle', 0, 0, '', 4), 10, true);
        croc1.callAll('animations.play', 'animations', 'spin');
    },

    follow : function(){

    },

    attack : function(){

    },

    delay : function(){

    },

    kill : function(player, croc1){

        if (attackButton.isDown)
        {
            croc1.kill();
        }
        else
        {
        	playerFunctions.prototype.kill();
        }
    }
};

//Jaxson C. Van Doorn, 2014
