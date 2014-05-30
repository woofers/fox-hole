//Jaxson C. Van Doorn, 2014

var checkpoint = {};

checkpoint = function(game){};

checkpoint.prototype = {

    loadCheckpoint: function(){

        //Create Checkpoint Group
        checkpointGroup = game.add.group(); 
        
        //Create Checkpoint From Tilemap
        checkpointGroupChilldren = objectsMap.createFromObjects('objects', 52, 'checkpointSprite', 0, true, false, checkpointGroup);

        //Enable Body and Physics
        checkpointGroup.enableBody = true;
        game.physics.arcade.enable(checkpointGroup);

        //Set Properties
        checkpointGroup.setAll('anchor.x', 0.5);
        checkpointGroup.setAll('scale.x', 2.5);
        checkpointGroup.setAll('scale.y', 2.5);
        checkpointGroup.setAll('body.bounce', 0);
        checkpointGroup.setAll('body.gravity.y', 700);
        checkpointGroup.setAll('smoothed', false);
        checkpointGroup.setAll('alpha', 0);
    },

    activate : function(){

        sav.x = player.x - 400;
    }
};

//Jaxson C. Van Doorn, 2014
