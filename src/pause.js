//Jaxson C. Van Doorn, 2014

var pauseMenu = {}

pauseMenu = function(game) {}

let init = false
pauseMenu.prototype = {
  loadPauseBg: function() {
    //Toggle About Menu
    pauseMenuBg = game.add.sprite(0, 0, 'pausedImage')
    pauseMenuBg.visible = !pauseMenuBg.visible
    pauseMenuBg.fixedToCamera = true
  },

  pauseText: function() {
    text.title.setText('PAUSED')
    text.selector1.setText('Resume')
    text.selector2.setText('Settings')
    text.selector3.setText('Save and Quit')
  },

  pauseGame: function() {
    if (!init) {
      let fullscreenPause = key => {
        const isSelected = currentScreen === 2 && menuSelect === 2
        if (
          isFullscreen === 'Off' &&
          isSelected &&
          !keyDebouncing[`${key}Pressed`]
        ) {
          gobalFunctions.prototype.gofull()
          keyDebouncing[`${key}Pressed`] = true
        }
      }
      let leftFullPause = () => fullscreenPause('left')
      let rightFullPause = () => fullscreenPause('right')
      cursors.left.onDown.add(leftFullPause, this)
      cursors.right.onDown.add(rightFullPause, this)
    }

    //Menu
    if (game.paused === true && text.loaded === true) {
      //Selectors
      if (menuSelect == 1) {
        gobalFunctions.prototype.highlight1()
      }
      if (menuSelect == 2) {
        gobalFunctions.prototype.highlight2()
      }
      if (menuSelect == 3) {
        gobalFunctions.prototype.highlight3()
      }

      //Paused
      if (currentScreen == 1) {
        //Resume
        if (menuSelect == 1) {
          //Unpause
          if (select.isDown && keyDebouncing.enterPressed === false) {
            keyDebouncing.enterPressed = false

            //Unpauses Game
            game.paused = false

            pauseMenu.prototype.textKill()

            pauseMenuBg.visible = !pauseMenuBg.visible
          }
        }

        //Settings
        if (menuSelect == 2) {
          //Enter
          if (select.isDown && keyDebouncing.enterPressed === false) {
            keyDebouncing.enterPressed = false
            currentScreen = 2
            menuSelect = 1
          }
        }

        //Back To Menu
        if (menuSelect == 3) {
          //To Menu
          if (select.isDown && keyDebouncing.enterPressed === false) {
            keyDebouncing.enterPressed = true

            //Call Function To Exit
            pauseMenu.prototype.textKill()
            chapter1.prototype.exit()
          }
        }

        //Go Back
        if (
          (backSelect.isDown && keyDebouncing.backPressed === false) ||
          (pauseButton.isDown && keyDebouncing.escPressed === false)
        ) {
          //Unpauses Game
          game.paused = false

          keyDebouncing.backPressed = true
          keyDebouncing.escPressed = true

          //Reset Selector
          menuSelect = 1

          //Kill Pause Assets
          pauseMenu.prototype.textKill()
          pauseMenuBg.visible = !pauseMenuBg.visible
        }
      }

      //Settings
      settings.fullscreenString = isFullscreen
      if (currentScreen == 2) {
        gobalFunctions.prototype.settingsText()

        //Resolution
        if (menuSelect == 1) {
        }

        //Fullscreen
        if (menuSelect == 2) {
          if (isFullscreen === 'On') {
            //Left
            if (cursors.left.isDown && keyDebouncing.leftPressed === false) {
              keyDebouncing.leftPressed = true
              gobalFunctions.prototype.fullExit()
            }

            //Right
            if (cursors.right.isDown && keyDebouncing.rightPressed === false) {
              keyDebouncing.rightPressed = true
              gobalFunctions.prototype.fullExit()
            }
          }
        }

        //Sound
        if (menuSelect == 3) {
          //Sound Down
          if (
            settings.sound > 0 &&
            cursors.left.isDown &&
            keyDebouncing.leftPressed === false
          ) {
            keyDebouncing.leftPressed = true
            gobalFunctions.prototype.soundDown()
          }

          //Sound Up
          if (
            settings.sound < 10 &&
            cursors.right.isDown &&
            keyDebouncing.rightPressed === false
          ) {
            keyDebouncing.rightPressed = true
            gobalFunctions.prototype.soundUp()
          }
        }

        //Go Back
        if (
          (backSelect.isDown && keyDebouncing.backPressed === false) ||
          (pauseButton.isDown && keyDebouncing.escPressed === false)
        ) {
          keyDebouncing.backPressed = true
          keyDebouncing.escPressed = true
          currentScreen = 1
          menuSelect = 2
          pauseMenu.prototype.pauseText()
        }
      }

      //Up
      if (cursors.up.isDown && keyDebouncing.upPressed === false) {
        keyDebouncing.upPressed = true
        menuSelect = menuSelect - 1
      } else if (cursors.down.isDown && keyDebouncing.downPressed === false) {
        //Down
        keyDebouncing.downPressed = true
        menuSelect = menuSelect + 1
      }

      //Looping
      if (menuSelect > 3) {
        menuSelect = 1
      } else if (menuSelect < 1) {
        menuSelect = 3
      }

      gobalFunctions.prototype.menuKeyDebouncing()
    }

    gobalFunctions.prototype.soundAdjust()

    //Refreshs function 60 times a second
    setTimeout(pauseMenu.prototype.pauseGame, 16)
  },

  createTextPause: function() {
    //Draw Title
    text.title = game.add.text(960, 240, 'PAUSED', titleStyle)
    text.title.anchor.setTo(0.5)
    text.title.fill = '#ffffff'
    text.title.fixedToCamera = true

    //Draw Selector 1
    text.selector1 = game.add.text(960, 525, 'Resume')
    text.selector1.anchor.setTo(0.5)
    text.selector1.fill = '#ffffff'
    text.selector1.fixedToCamera = true

    //Draw Selector 2
    text.selector2 = game.add.text(960, 690, 'Settings')
    text.selector2.anchor.setTo(0.5)
    text.selector2.fill = '#ffffff'
    text.selector2.fixedToCamera = true

    //Draw Selector 3
    text.selector3 = game.add.text(960, 840, 'Save and Quit')
    text.selector3.anchor.setTo(0.5)
    text.selector3.fill = '#ffffff'
    text.selector3.fixedToCamera = true

    gobalFunctions.prototype.highlight1()

    text.loaded = true
  },

  textKill: function() {
    //Remove Text
    text.title.destroy()
    text.selector1.destroy()
    text.selector2.destroy()
    text.selector3.destroy()
  },
}

//Jaxson C. Van Doorn, 2014
