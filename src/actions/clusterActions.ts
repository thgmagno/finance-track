'use server'

import { db } from '@/db'
import { ClusterSchema } from '@/lib/schemas/clusterSchema'
import { CreateCluster } from '@/lib/schemas/dbSchema'
import { ClusterFormState } from '@/lib/states/clusterState'
import { refreshSessionToken } from './authActions'
import { revalidatePath } from 'next/cache'

export async function getClusterDetails(clusterId: number) {
  const cluster = await db
    .selectFrom('clusters')
    .selectAll()
    .where('clusters.id', '=', clusterId)
    .executeTakeFirst()

  return cluster
}

export async function saveClusterOnDatabase(cluster: CreateCluster) {
  const values = {
    name: cluster.name,
    owner_id: cluster.owner_id,
  }

  const result = await db
    .insertInto('clusters')
    .values(values)
    .returning('id')
    .executeTakeFirst()

  return result
}

export async function createCluster(
  formState: ClusterFormState,
  formData: FormData,
): Promise<ClusterFormState> {
  const parsed = ClusterSchema.safeParse({
    name: formData.get('name'),
    userId: formData.get('userId'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const res = await saveClusterOnDatabase({
      name: parsed.data.name,
      owner_id: parsed.data.userId,
    })

    if (res?.id && res.id > 0) {
      await refreshSessionToken({
        cluster: parsed.data.name,
        clusterId: res.id,
      })
    }
  } catch (err) {
    return {
      errors: { _form: 'Internal server error' },
    }
  }

  revalidatePath('/')
  return { errors: {} }
}
