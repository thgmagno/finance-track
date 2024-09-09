import { init } from '@paralleldrive/cuid2'

export const createId = init({
  random: Math.random,
  length: 25,
  fingerprint: 'd7du4tb3l9wduvualkbfll8a6',
})
