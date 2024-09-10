'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import {
  ClusterFormState,
  FindClusterFormState,
} from '@/lib/states/clusterState'
import { ClusterSchema, FindClusterSchema } from '@/lib/schemas/clusterSchema'
import { createId } from '@/utils/createId'
import { refreshSessionToken } from './authActions'
import { utilityFunctions } from '@/lib/utility_functions'

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

    await utilityFunctions.clusters.create(
      clusterId,
      parsed.data.name,
      parsed.data.userId,
    )

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

export async function findClusterByName(
  formState: FindClusterFormState,
  formData: FormData,
): Promise<FindClusterFormState> {
  const parsed = FindClusterSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const clusters = await prisma.cluster.findMany({
      select: { id: true, name: true },
      where: { name: { contains: parsed.data.name, mode: 'insensitive' } },
      take: 5,
    })

    return { clusters, errors: {} }
  } catch (err) {
    return {
      errors: {
        _form: 'Internal server error',
      },
    }
  }
}

export async function getClusterParticipantsAndInvites(clusterId: string) {
  return utilityFunctions.clusters.getClusterWithParticipantsAndInvites(
    clusterId,
  )
}

export async function sendClusterRequest(clusterId: string, userId: string) {
  return utilityFunctions.clusters.sendRequest(clusterId, userId)
}
