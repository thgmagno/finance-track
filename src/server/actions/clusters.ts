'use server'

import {
  CreateClusterFormState,
  CreateClusterSchema,
} from '@/lib/models/cluster'
import { db } from '@/server/db'
import {
  getSession,
  removeClusterFromSessionAndStoreToken,
  updateSessionAndStoreToken,
} from '@/server/actions/session'
import { clearCache } from '@/server/cache'

export async function getCluster({ id, name }: { id?: string; name?: string }) {
  const cluster = await db.cluster.findMany({
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

export async function createCluster(
  formState: CreateClusterFormState,
  formData: FormData,
): Promise<CreateClusterFormState> {
  const { sub } = await getSession()

  const parsed = CreateClusterSchema.safeParse({
    clusterName: formData.get('clusterName'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const cluster = await db.cluster.create({
      data: { name: parsed.data.clusterName, ownerId: sub },
    })

    await Promise.all([
      db.user.update({
        data: { clusterId: cluster.id },
        where: { id: sub },
      }),
      updateSessionAndStoreToken({ cluster }),
    ])
  } catch (err) {
    return {
      errors: { _form: 'Internal server error' },
    }
  }

  return { errors: {} }
}

export async function deleteCluster() {
  try {
    const { sub, name, clusterId } = await getSession()

    const isValid = typeof clusterId === 'string' && typeof name === 'string'

    if (!isValid) {
      return { success: false, message: 'Invalid parameters' }
    }

    const cluster = await db.cluster.findUniqueOrThrow({
      where: { id: clusterId },
    })

    if (cluster.ownerId !== sub) {
      return {
        success: false,
        message: 'Only the cluster owner can delete it.',
      }
    }

    const participantsIds = await db.user
      .findMany({
        where: { clusterId },
        select: { id: true },
      })
      .then((list) => list.map((user) => user.id))

    if (participantsIds.length) {
      await db.user.updateMany({
        data: { clusterId: null },
        where: { id: { in: participantsIds } },
      })
    }

    await Promise.all([
      db.cluster.delete({ where: { id: cluster.id } }),
      removeClusterFromSessionAndStoreToken(sub, name),
      clearCache(cluster.id),
    ])

    return { success: true, message: 'Cluster deleted successfully' }
  } catch (err) {
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}
