import Phaser from 'phaser'

import config from '../config'
import signals from '../signals'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, config.player.startPosition.x, config.player.startPosition.y, 'player')

    this.animations.add('run')
    this.animations.play('run', 30, true)

    this.game.physics.enable(this)
    this.body.setSize(19, 54, 43, 10)

    this.game.add.existing(this)

    this.slowedDown = false

    signals.jump.add(this.jump, this)
    signals.attack.add(this.attack, this)

    signals.speedDown.add(this.slowDown, this)
    signals.speedReset.add(this.resetSpeed, this)
  }

  update () {
    this.run()
  }

  run () {
    this.body.velocity.x = this.game.vars.speed
  }

  // Check if player is on surface
  isOnFloor () { return this.body.touching.down }

  jump () {
    if (this.isOnFloor()) {
      this.body.velocity.y = -this.game.vars.player.jumpSpeed.y
      this.game.sounds.jump.play()
    }
  }

  attack () {
    this.game.sounds.attack.play()
    signals.mow.dispatch(this)

    // attack animation
  }

  slowDown () {
    this.slowedDown = true
  }

  resetSpeed () {
    this.slowedDown = false
  }
}
