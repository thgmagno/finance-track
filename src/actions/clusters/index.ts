'use server'

import { prisma } from '@/lib/prisma'
import {
  getSession,
  removeClusterFromSessionAndStoreToken,
  updateSessionAndStoreToken,
} from '@/actions/authentication/session'
import {
  CreateClusterFormState,
  CreateClusterSchema,
} from '@/lib/models/cluster'
import { revalidatePath } from 'next/cache'

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
      updateSessionAndStoreToken({ cluster }),
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
      return {
        success: false,
        message: 'Only the cluster owner can delete it.',
      }
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
      removeClusterFromSessionAndStoreToken(sub, name),
    ])

    return { success: true, message: 'Cluster deleted successfully' }
  } catch (err) {
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}

export async function inviteUserForCluster(userEmail: string) {
  try {
    const { clusterId } = await getSession()
    const alreadySended = await prisma.clusterInvite.findFirst({
      where: {
        clusterId: String(clusterId),
        user: { email: userEmail },
        status: 'pending',
      },
    })
    if (alreadySended) {
      return {
        success: false,
        message:
          'An invitation has already been sent to this email address and is still pending.',
      }
    }

    await prisma.user
      .findUniqueOrThrow({
        where: {
          email: userEmail,
        },
      })
      .then(
        async (user) =>
          await prisma.clusterInvite.create({
            data: { clusterId: String(clusterId), userId: user.id },
          }),
      )
  } catch (error) {
    return {
      success: false,
      message:
        'Unable to send the invitation to this email address. Please try again later.',
    }
  }

  return { success: true, message: 'The invitation was sent successfully.' }
}

export async function acceptInviteCluster(clusterId: string) {
  try {
    const { sub } = await getSession()
    await Promise.all([
      prisma.$executeRaw`CALL handle_cluster_invite(${clusterId}, ${sub}, 'accept')`,
      prisma.cluster
        .findUniqueOrThrow({
          where: { id: clusterId },
        })
        .then((cluster) => updateSessionAndStoreToken({ cluster })),
    ])
  } catch (error) {
    return { success: false, message: 'An error ocurred. Please try again' }
  }

  revalidatePath('/')
  return { success: true, message: 'The invitation has been accepted' }
}

export async function rejectInviteCluster(clusterId: string) {
  try {
    const { sub } = await getSession()
    await prisma.$executeRaw`CALL handle_cluster_invite(${clusterId}, ${sub}, 'reject')`
  } catch (error) {
    return { success: false, message: 'An error ocurred. Please try again' }
  }

  revalidatePath('/')
  return { success: true, message: 'The invitation has been rejected' }
}
