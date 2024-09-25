'use server'

import { UpdateInfoFormState, UpdateInfoSchema } from '@/lib/models/users'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { getSession, updateSessionAndStoreToken } from './session'

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
    data: { name, email, password: hash },
  })

  return user
}

export async function updateInfo(
  formState: UpdateInfoFormState,
  formData: FormData,
): Promise<UpdateInfoFormState> {
  const parsed = UpdateInfoSchema.safeParse({
    username: formData.get('username'),
    clusterName: formData.get('clusterName'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const { sub, clusterId, name, cluster } = await getSession()
    const hasUsernameChanged = parsed.data.username !== name
    const hasClusterNameChanged = parsed.data.clusterName !== cluster

    if (hasUsernameChanged || hasClusterNameChanged) {
      if (hasUsernameChanged) {
        await db.user.update({
          where: { id: sub },
          data: { name: parsed.data.username },
        })
      }

      if (hasClusterNameChanged) {
        await db.cluster.update({
          where: { id: clusterId },
          data: { name: parsed.data.clusterName },
        })
      }

      await updateSessionAndStoreToken({
        user: { id: sub, name: parsed.data.username },
        cluster: { id: clusterId, name: parsed.data.clusterName },
      })
    }
  } catch (error) {
    return {
      errors: { _form: 'Failed connect to the server' },
    }
  }

  revalidatePath('/')
  return { success: true, errors: {} }
}
