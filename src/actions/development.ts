'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function resetDatabase() {
  try {
    await Promise.all([
      prisma.category.deleteMany({
        where: { id: { notIn: [''] } },
      }),
      prisma.transaction.deleteMany({
        where: { id: { notIn: [''] } },
      }),
      prisma.method.deleteMany({
        where: { id: { notIn: [''] } },
      }),
    ])
  } catch (error) {
    return false
  }

  revalidatePath('/')

  return true
}
