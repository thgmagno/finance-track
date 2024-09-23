'use server'

import { getCategoriesGroupedByType } from '@/server/actions/categories'
import { getMethods } from '@/server/actions/methods'
import { getCurrentTransactions } from '@/server/actions/transactions'
import { getSession } from '@/server/actions/session'

export async function getFiananceDetails() {
  const { clusterId } = await getSession()

  const [categories, methods, currentTransactions] = await Promise.allSettled([
    getCategoriesGroupedByType(clusterId),
    getMethods(clusterId),
    getCurrentTransactions(clusterId),
  ])

  return {
    categories,
    methods,
    currentTransactions,
  }
}
