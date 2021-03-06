/* globals __DEV__ */
const tileSize = 32

const pxToTiles = px => Math.ceil(px / tileSize)
const tilesToPx = tiles => tiles * tileSize

const gameWidth = tilesToPx(17)
const gameHeight = tilesToPx(10)

const gameWidthInTiles = pxToTiles(gameWidth)
const gameHeightInTiles = pxToTiles(gameHeight)

const gameScreensPx = screensCount => gameWidth * screensCount
const gameScreensTiles = screensCount => gameWidthInTiles * screensCount

export default {
  godMode: __DEV__,

  gameWidth,
  gameHeight,
  gameWidthInTiles,
  gameHeightInTiles,
  tileSize,

  bg: { color: '#5d5b6a' },

  gravity: { y: 3500 },
  initialSpeed: 147.69230769230888715,

  player: {
    jumpSpeed: { x: 0, y: 530 },
    slowdownRate: 0.8,
    cooldown: 1000,
    jumpDuration: 125,
    attackCooldown: 500 // milliseconds
  },

  chaser: {
    backlogRate: 0.9, // was 0.75
    attackCooldown: 1000 // milliseconds
  },

  ground: {
    height: { min: 1, max: 4 }
  },

  obstacle: {
    Grave: { max: 10 }
  },

  enemies: { max: 10 },

  terrain: {
    corgyland: {
      p: 20,
      length: { min: gameScreensTiles(0.5), max: gameScreensTiles(1) },
      floor: {
        default: 'Ground',
        Ground: { height: 1 }
      },
      enemies: {
        Corgy: { p: 15 }
      },
      obstacles: {
        Grave: { p: 15, between: { min: 1 } }
      }
    },
    graveyard: {
      p: 20,
      length: { min: gameScreensTiles(0), max: gameScreensTiles(2) },
      floor: {
        default: 'Ground',
        Ground: { height: 1 },
        Swamp: { p: 10, inRow: { max: 2 } }
      },
      obstacles: {
        Grave: { p: 65, between: { min: 1 } }
      },
      enemies: {
        Skeleton: { p: 7, between: {min: 2} }
      }
    },

    swampy: {
      p: 20,
      length: { min: gameScreensTiles(0), max: gameScreensTiles(2) },
      floor: {
        default: 'Ground',
        Ground: { height: 1 },
        Swamp: { p: 40, inRow: { max: 2 } }
      },
      obstacles: {
        Grave: { p: 15, between: { min: 5 } }
      }
    },

    habitual: {
      p: 30,
      length: { min: gameScreensTiles(1), max: gameScreensTiles(2) },
      floor: {
        default: 'Ground',
        Ground: { height: 1 },
        Swamp: { p: 15, inRow: { max: 2 } }
      },
      obstacles: {
        Grave: { p: 15, between: { min: 5 } }
      },
      enemies: {
        Skeleton: { p: 5 },
        Bat: { p: 5 }
      }
    }
  }
}
