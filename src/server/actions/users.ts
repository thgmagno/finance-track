'use server'

import { capitalizeStr } from '@/lib/helpers'
import { db } from '@/server/db'

export async function getUser({
  name,
  email,
}: {
  name?: string
  email?: string
}) {
  const user = await db.user.findFirst({
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
  const user = await db.user.create({
    data: { name: capitalizeStr(name), email, password: hash },
  })

  return user
}
