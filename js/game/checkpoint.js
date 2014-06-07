//Jaxson C. Van Doorn, 2014

var checkpoint = {};

checkpoint = function(game){};

checkpoint.prototype = {

    load: function(){

        //Create Checkpoint Group
        checkpointGroup = game.add.group(); 
        
        //Create Checkpoint From Tilemap
        checkpointGroupChilldren = objectsMap.createFromObjects('objects', 52, 'checkpointSprite', 0, true, false, checkpointGroup);

        //Enable Body and Physics
        checkpointGroup.enableBody = true;
        game.physics.arcade.enable(checkpointGroup);

        //Set Properties
        checkpointGroup.setAll('anchor.x', 0.5);
        checkpointGroup.setAll('scale.x', 4);
        checkpointGroup.setAll('scale.y', 4);
        checkpointGroup.setAll('body.bounce', 0);
        checkpointGroup.setAll('body.gravity.y', 700);
        checkpointGroup.setAll('smoothed', false);

        //Activate
        checkpointGroup.callAll('animations.add', 'animations', 'activate', Phaser.Animation.generateFrameNames('checkpoint', 0, 16, '', 4), 12, false);
    },

    activate : function(player, checkpointGroup){

        sav.x = checkpointGroup.x - 300;

        if (!checkpointGroup.activate === true)
        {
            sav.x = checkpointGroup.x - 300;
            checkpointGroup.activate = true;
            checkpointGroup.animations.play('activate');

                if (soundPlay === true)
                {
                    checkpointSfx.play('', 0, 1, false);
                }
        }
    }
};

//Jaxson C. Van Doorn, 2014
