'use server'

import { kv } from '@vercel/kv'
import { db } from '../db'

export async function getCacheTest() {
  try {
    const cache = await kv.get('test_cache')

    if (!cache) {
      await db.user.findFirst({
        where: { id: 'cm1fg7szb000010e9mtiha1xl' },
      })

      return 'postgres'
    }

    return 'kv'
  } catch (error) {
    return 'failed do fetch'
  }
}

export async function setCacheTest() {
  await kv.set('test_cache', 'cm1fg7szb000010e9mtiha1xl', { ex: 300 })
  return 'kv'
}

export async function resetCacheTest() {
  await kv.del('test_cache')
  return '-'
}
