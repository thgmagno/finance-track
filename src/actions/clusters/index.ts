'use server'

import { prisma } from '@/lib/prisma'
import { getSession, updateSession } from '../authentication/session'
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

    await updateSession({ cluster })
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
  // TODO:
  // removeAllClusterParticipants
  // deleteAllClusterTransactions
  // deleteAllClusterInvites
  // deleteAllClusterCategories
  // deleteAllClusterCreditCardInstallments
  // deleteAllClusterSavings
}
