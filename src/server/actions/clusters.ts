'use server'

import {
  CreateClusterFormState,
  CreateClusterSchema,
} from '@/lib/models/cluster'
import { db } from '@/server/db'
import {
  getSession,
  updateSessionAndStoreToken,
} from '@/server/actions/session'

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
