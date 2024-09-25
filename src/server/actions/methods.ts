'use server'

import { getCache, setCacheWithTTL } from '@/server/cache'
import { getSession } from '@/server/actions/session'
import { db } from '@/server/db'
import { z } from 'zod'
import { CreateMethodFormState, CreateMethodSchema } from '@/lib/models/methods'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const MethodSchema = z.object({
  id: z.string().cuid(),
  description: z.string(),
  clusterId: z.string().cuid(),
})

const MethodArraySchema = z.array(MethodSchema)

export async function getMethods() {
  const { clusterId } = await getSession()

  const cache = await getCache({ type: 'methods', id: clusterId })

  if (!cache) {
    const data = await revalidateCache(clusterId, true)
    return data
  }

  const parsed = MethodArraySchema.safeParse(cache)

  return parsed.success ? parsed.data : []
}

export async function upsertMethod(
  formState: CreateMethodFormState,
  formData: FormData,
): Promise<CreateMethodFormState> {
  const { clusterId } = await getSession()

  const parsed = CreateMethodSchema.safeParse({
    id: formData.get('id'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await db.method.upsert({
      where: {
        id: parsed.data.id,
      },
      update: {
        description: parsed.data.description,
        clusterId,
      },
      create: {
        description: parsed.data.description,
        clusterId,
      },
    })

    await revalidateCache(clusterId)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/methods')
}

export async function deleteMethod(methodId: string) {
  const { clusterId } = await getSession()
  await db.method.delete({
    where: { id: methodId, clusterId },
  })
  await revalidateCache(clusterId)
}

export async function revalidateCache(clusterId: string, returnData?: boolean) {
  const dataToCache = await db.method.findMany({
    where: { clusterId },
    orderBy: { description: 'asc' },
  })

  await setCacheWithTTL({
    type: 'methods',
    id: clusterId,
    data: JSON.stringify(dataToCache),
    ttl: 'oneWeek',
  })

  revalidatePath('/')
  return returnData ? dataToCache : null
}
