'use server'

import { db } from '@/server/db'

export async function getMethods(clusterId: string) {
  return db.method.findMany({
    where: { clusterId },
  })
}
