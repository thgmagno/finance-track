'use server'

import { prisma } from '@/lib/prisma'
import {
  getSession,
  removeClusterDataFromToken,
  updateSession,
} from '@/actions/authentication/session'
import {
  CreateClusterFormState,
  CreateClusterSchema,
} from '@/lib/models/cluster'

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

export async function createCluster(
  formState: CreateClusterFormState,
  formData: FormData,
): Promise<CreateClusterFormState> {
  const { sub } = await getSession()
  if (!sub) {
    return { errors: { _form: 'Not autorized' } }
  }

  const validationResult = validateClusterData(formData)
  if (!validationResult.success) {
    return { errors: validationResult.errors! }
  }

  const { clusterName } = validationResult.data!

  try {
    const cluster = await prisma.cluster.create({
      data: { name: clusterName, ownerId: sub },
    })

    await Promise.all([
      prisma.user.update({
        data: { clusterId: cluster.id },
        where: { id: sub },
      }),
      updateSession({ cluster }),
    ])
  } catch (err) {
    return {
      errors: { _form: 'Internal server error' },
    }
  }

  return { errors: {} }
}

function validateClusterData(formData: FormData) {
  const parsed = CreateClusterSchema.safeParse({
    clusterName: formData.get('clusterName'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  return { success: true, data: parsed.data }
}

export async function deleteCluster() {
  try {
    const { sub, name, clusterId } = await getSession()

    const isValid = typeof clusterId === 'string' && typeof name === 'string'

    if (!isValid) {
      return { success: false, message: 'Invalid parameters' }
    }

    const cluster = await prisma.cluster.findUniqueOrThrow({
      where: { id: clusterId },
    })

    if (cluster.ownerId !== sub) {
      return { success: false, message: 'Not autorized' }
    }

    const participantsIds = await prisma.user
      .findMany({
        where: { clusterId },
        select: { id: true },
      })
      .then((list) => list.map((user) => user.id))

    if (participantsIds.length) {
      await prisma.user.updateMany({
        data: { clusterId: null },
        where: { id: { in: participantsIds } },
      })
    }

    await Promise.all([
      prisma.cluster.delete({ where: { id: cluster.id } }),
      removeClusterDataFromToken(sub, name),
    ])

    return { success: true, message: 'Cluster deleted successfully' }
  } catch (err) {
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}
