'use server'

import { time } from './constants'
import { generateKey } from './helpers'
import { kv } from '@vercel/kv'

interface GetParams {
  type:
    | 'categories'
    | 'methods'
    | 'expenses'
    | 'receipts'
    | 'savings'
    | 'expense_analytics'
  clusterId: string
  year?: number
  month?: number
}

interface SetParams extends GetParams {
  data: string
  ttl: 'oneDay' | 'oneWeek'
}

export async function getCache(params: GetParams) {
  try {
    const key = generateKey(params)
    return kv.get(key)
  } catch (error) {
    console.error('Error retrieving cache:', error)
  }
}

export async function setCacheWithTTL(params: SetParams) {
  try {
    const key = generateKey(params)
    await kv.set(key, params.data, { ex: time[params.ttl] })
  } catch (error) {
    console.error('Error setting cache:', error)
  }
}

export async function clearCache(clusterId: string) {
  try {
    const keys: string[] = []
    await Promise.all([
      kv.keys(`*:${clusterId}`).then((data) => keys.push(...data)),
      kv.keys(`*:${clusterId}:*`).then((data) => keys.push(...data)),
    ])

    const promises = keys.map((key) => kv.del(key))
    await Promise.all(promises)
  } catch (error) {
    console.error('Error setting cache:', error)
  }
}
