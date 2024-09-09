'use server'

import { prisma } from '@/lib/prisma'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import { ClusterFormState } from '@/lib/states/clusterState'
import { ClusterSchema } from '@/lib/schemas/clusterSchema'
import { createId } from '@/utils/createId'
import { refreshSessionToken } from './authActions'

export async function getClusterDetails(clusterId: string) {
  const cluster = await prisma.cluster.findFirst({
    where: { id: clusterId },
  })

  return cluster
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
    const clusterId = createId()

    await sql`SELECT create_cluster(${clusterId}, ${parsed.data.name}, ${parsed.data.userId})`

    const payload = {
      cluster: parsed.data.name,
      clusterId,
    }

    await refreshSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Internal server error' },
    }
  }

  redirect('/')
}
