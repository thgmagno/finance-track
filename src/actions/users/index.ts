'use server'

import { prisma } from '@/lib/prisma'
import { capitalizeStr } from '@/lib/helpers'
import { getSession } from '../authentication/session'
import { DataUser } from '@/lib/models/dataUser'

export async function getUser({
  name,
  email,
}: {
  name?: string
  email?: string
}) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(email && { email: { contains: email, mode: 'insensitive' } }),
        },
      ],
    },
  })

  return user
}

export async function createUser(name: string, email: string, hash: string) {
  const user = await prisma.user.create({
    data: { name: capitalizeStr(name), email, password: hash },
  })

  return user
}

export async function fetchUsersByEmailExcludingCurrentUser(email: string) {
  const { sub } = await getSession()
  return prisma.user.findFirst({
    where: {
      email: {
        contains: email,
        mode: 'insensitive',
      },
      id: {
        not: sub,
      },
      clusterId: {
        equals: undefined,
      },
    },
    select: {
      name: true,
      email: true,
    },
  })
}

export async function fetchDataUser(userId: string) {
  const dataUser: DataUser = {
    invites: [],
  }

  const inviteCounter = await prisma.clusterInvite.count({
    where: { userId, status: 'pending' },
  })

  if (inviteCounter) {
    const invites = await prisma.clusterInvite
      .findMany({
        where: { userId, status: 'pending', cluster: { NOT: undefined } },
        select: { cluster: { select: { name: true, id: true } } },
      })
      .then((res) => res.map((list) => list.cluster))
    const validInvites = invites.filter((inv) => inv !== null)
    dataUser.invites.push(
      ...validInvites.map((inv) => ({
        clusterId: inv.id,
        clusterName: inv.name,
      })),
    )
  }

  return dataUser
}
