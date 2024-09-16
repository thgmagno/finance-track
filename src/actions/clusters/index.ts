'use server'

import { prisma } from '@/lib/prisma'
import { updateSession } from '../authentication/session'

export async function getCluster({ id, name }: { id?: string; name?: string }) {
  const cluster = await prisma.cluster.findMany({
    where: {
      OR: [
        {
          ...(id && { id: { equals: id } }),
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
        },
      ],
    },
    select: {
      id: true,
      name: true,
      owner: {
        select: { name: true },
      },
    },
  })

  return cluster
}

export async function createCluster(name: string, ownerId: string) {
  const cluster = await prisma.cluster.create({
    data: { name, ownerId },
  })

  await updateSession({ cluster })

  return cluster
}
