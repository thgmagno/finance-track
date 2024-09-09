'use server'

import { prisma } from '@/lib/prisma'

export async function getUserDetails({
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
