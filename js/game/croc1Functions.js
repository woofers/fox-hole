//Jaxson C. Van Doorn, 2014

var croc1Functions = {}

croc1Funtions = function(game) {}

croc1Functions.prototype = {
  load: function() {
    //Create Croc1 Group
    croc1 = game.add.group()

    //Create Croc1 From Tilemap
    croc1Chilldren = objectsMap.createFromObjects(
      'objects',
      50,
      'croc1Sprite',
      0,
      true,
      false,
      croc1
    )

    //Enable Body and Physics
    croc1.enableBody = true
    game.physics.arcade.enable(croc1)

    //Set Properties
    croc1.setAll('anchor.x', 0.5)
    croc1.setAll('scale.x', 4)
    croc1.setAll('scale.y', 4)
    croc1.setAll('body.bounce', 0)
    croc1.setAll('body.gravity.y', 700)
    croc1.setAll('body.collideWorldBounds', true)
    croc1.setAll('smoothed', false)

    //Flip
    croc1.getAt(2).scale.x = -4
    croc1.getAt(3).scale.x = -4

    //Walk
    croc1.callAll(
      'animations.add',
      'animations',
      'walk',
      Phaser.Animation.generateFrameNames('croc1Walk', 0, 1, '', 4),
      10,
      true
    )
    croc1.callAll(
      'animations.add',
      'animations',
      'idle',
      Phaser.Animation.generateFrameNames('croc1Idle', 0, 1, '', 4),
      5,
      true
    )
    croc1.callAll('animations.play', 'animations', 'idle')
  },

  jumpDelay: function() {
    croc1.getAt(i).jumpDelay = game.time.now
    croc1.getAt(i).jump = true
  },

  ai: function() {
    //Croc1 AI
    for (i = 0; i < croc1.length; i++) {
      if (player.dig === false) {
        //Facing Right -->
        if (croc1.getAt(i).scale.x == 4) {
          croc1.getAt(i).body.width = 150
          croc1.getAt(i).body.offset.x = -20

          //Follow Right
          if (
            player.x - 500 < croc1.getAt(i).x &&
            player.x > croc1.getAt(i).x
          ) {
            croc1.getAt(i).scale.x = 4
            croc1.getAt(i).follow = true
          }

          //Flip to Left
          if (
            player.x + 500 > croc1.getAt(i).x &&
            player.x < croc1.getAt(i).x &&
            croc1.getAt(i).follow === true
          ) {
            croc1.getAt(i).scale.x = -4
          }

          //Stop Follow Right
          if (
            (player.x - 1200 > croc1.getAt(i).x &&
              player.x > croc1.getAt(i).x &&
              croc1.getAt(i).body.blocked.down) ||
            player.killCheck === true
          ) {
            croc1.getAt(i).follow = false
            game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0)
          }
        }

        //Facing Left <--
        if (croc1.getAt(i).scale.x == -4) {
          croc1.getAt(i).body.width = 150
          croc1.getAt(i).body.offset.x = 20

          //Follow Left
          if (
            player.x + 500 > croc1.getAt(i).x &&
            player.x < croc1.getAt(i).x
          ) {
            croc1.getAt(i).scale.x = -4
            croc1.getAt(i).follow = true
          }

          //Flip to Right
          if (
            player.x - 500 < croc1.getAt(i).x &&
            player.x > croc1.getAt(i).x &&
            croc1.getAt(i).follow === true
          ) {
            croc1.getAt(i).scale.x = 4
          }

          //Stop Follow Left
          if (
            (player.x + 1200 < croc1.getAt(i).x &&
              player.x < croc1.getAt(i).x &&
              croc1.getAt(i).body.blocked.down) ||
            player.killCheck === true
          ) {
            croc1.getAt(i).follow = false
            game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0)
          }
        }

        //Start Jump
        if (croc1.getAt(i).body.blocked.down) {
          if (
            croc1.getAt(i).body.blocked.left ||
            croc1.getAt(i).body.blocked.right
          ) {
            croc1.getAt(i).isJumping = true
          }
        }

        //Jump
        if (croc1.getAt(i).isJumping === true) {
          croc1.getAt(i).y -= 30
        }

        //Jump Delay
        if (
          !croc1.getAt(i).body.blocked.down &&
          croc1.getAt(i).isJumping === true &&
          !croc1.getAt(i).jump === true
        ) {
          croc1Functions.prototype.jumpDelay()
        }

        //Rest Jump
        if (currentTime - croc1.getAt(i).jumpDelay > 125) {
          croc1.getAt(i).isJumping = false
          croc1.getAt(i).jump = false
        }

        //Follow
        if (croc1.getAt(i).follow === true) {
          game.physics.arcade.moveToObject(croc1.getAt(i), player, 375, 0)
          croc1.callAll('animations.play', 'animations', 'walk')
        }

        //Set follow to false
        if (!croc1.getAt(i).follow === true) {
          croc1.getAt(i).follow = false
        }
      } else if (player.dig === true) {
        //Stop Follow
        croc1.getAt(i).follow = false
        game.physics.arcade.moveToObject(croc1.getAt(i), player, 0, 0)
        croc1.callAll('animations.play', 'animations', 'idle')
      }
    }
  },

  killCheck: function(player, croc1) {
    if (
      (player.animations.currentFrame.index > 76 &&
        player.animations.currentFrame.index < 79) ||
      player.isAnim === true
    ) {
      croc1.kill()
    } else if (
      player.tailWhip === false &&
      player.body.blocked.down &&
      player.isDigging === false
    ) {
      croc1.animations.play('idle')
      player.killCheck = true
    } else if (!player.body.blocked.down) {
      playerFunctions.prototype.kill()
    }
  },
}

//Jaxson C. Van Doorn, 2014
