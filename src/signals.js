import Phaser from 'phaser'

export default {
  // controller signals
  jump: new Phaser.Signal(),
  attack: new Phaser.Signal(),

  // game & player speed signals
  speedUp: new Phaser.Signal(),
  speedReset: new Phaser.Signal(),
  speedDown: new Phaser.Signal(),

  // global game signals
  gameOver: new Phaser.Signal()
}
