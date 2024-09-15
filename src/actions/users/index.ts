'use server'

import { prisma } from '@/lib/prisma'
import { capitalizeStr } from '@/lib/helpers'
import { getSession } from '../authentication/session'

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
    },
    select: {
      name: true,
      email: true,
    },
  })
}
