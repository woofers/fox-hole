//Jaxson C. Van Doorn, 2014

var gobalFunctions = {}

gobalFunctions = function(game) {}

const FONT = 'Didact Gothic'
const BOLD_FONT = 'Didact Gothic'
const TITLE_FONT = 'Roboto'

const initFont = () => {
  text.title.font = TITLE_FONT
  text.title.fontSize = 250
}

gobalFunctions.prototype = {

  highlight1: function() {
    initFont()
    text.selector1.font = BOLD_FONT
    text.selector1.fontSize = 80
    text.selector2.font = FONT
    text.selector2.fontSize = 60
    text.selector3.font = FONT
    text.selector3.fontSize = 60
  },

  highlight2: function() {
    initFont()
    text.selector1.font = FONT
    text.selector1.fontSize = 60
    text.selector2.font = BOLD_FONT
    text.selector2.fontSize = 80
    text.selector3.font = FONT
    text.selector3.fontSize = 60
  },

  highlight3: function() {
    initFont()
    text.selector1.font = FONT
    text.selector1.fontSize = 60
    text.selector2.font = FONT
    text.selector2.fontSize = 60
    text.selector3.font = BOLD_FONT
    text.selector3.fontSize = 80
  },

  mainText: function() {
    text.title.setText('FOX')
    text.selector1.setText('Play')
    text.selector2.setText('Settings')
    text.selector3.setText('About')
  },

  settingsText: function() {
    text.title.setText('SETTINGS')
    text.selector1.setText(
      'Resolution - ' + game.scale.width + ' x ' + game.scale.height
    )
    text.selector2.setText('Fullscreen - ' + settings.fullscreenString)
    text.selector3.setText('Sound - ' + settings.sound)
  },

  soundUp: function() {
    settings.sound += 1
  },

  soundDown: function() {
    settings.sound -= 1
  },

  soundAdjust: function() {
    //Volume Controll
    music.volume = settings.sound / 10
    checkpointSfx.volume = settings.sound / 10
    deathSfx.volume = settings.sound / 10
    hitSfx.volume = settings.sound / 10
    tailWhipSfx.volume = settings.sound / 10
    digSfx.volume = settings.sound / 10
    digDelaySfx.volume = settings.sound / 10

    //Auto Save
    store.set('save.settings.sound', settings.sound)
  },

  sfxDelay: function() {
    soundDelay = game.time.now
  },

  fullExit: function() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  },

  gofull: function() {
    //Scale Screen To Fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.startFullScreen()
  },

  camera: function() {
    //Camera
    sav.cameraY = 184 + player.y
    camera = game.world.setBounds(0.5, 0, 15806, sav.cameraY)

    //Camera Max out
    if (sav.cameraY > 1536) {
      sav.cameraY = 1536
      camera = game.world.setBounds(0.5, 0, 15806, sav.cameraY)
    }
  },

  keyDebouncing: function() {
    //Key Debouncing
    if (!jumpButton.isDown) {
      keyDebouncing.spacePressed = false
    }
    if (!downButton.isDown) {
      keyDebouncing.downPressed = false
    }
    if (!cursors.down.isDown) {
      keyDebouncing.enterPressed = false
    }
    if (!attackButton.isDown) {
      keyDebouncing.attackPressed = false
    }
  },

  menuKeyDebouncing: function() {
    //Key Deboucing
    if (!cursors.up.isDown) {
      keyDebouncing.upPressed = false
    }
    if (!cursors.down.isDown) {
      keyDebouncing.downPressed = false
    }
    if (!cursors.right.isDown) {
      keyDebouncing.rightPressed = false
    }
    if (!cursors.left.isDown) {
      keyDebouncing.leftPressed = false
    }
    if (!select.isDown) {
      keyDebouncing.enterPressed = false
    }
    if (!backSelect.isDown) {
      keyDebouncing.backPressed = false
    }
    if (!pauseButton.isDown) {
      keyDebouncing.escPressed = false
    }
  },
}

//Jaxson C. Van Doorn, 2014
