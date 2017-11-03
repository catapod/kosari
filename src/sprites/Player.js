import Phaser from 'phaser'

import signals from '../signals'

export default class extends Phaser.Sprite {
  constructor (game) {
    const x = game.width / 2 - 31 // (body offset + body width) / 2
    const y = game.height - 96 // player height + starting floor height
    super(game, x, y, 'player')

    this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    this.animations.add('mow', [15, 16, 17])

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
