'use server'

import { getCache, setCacheWithTTL } from '@/server/cache'
import { getSession } from '@/server/actions/session'
import { db } from '@/server/db'
import { $Enums } from '@prisma/client'
import { z } from 'zod'
import {
  CreateCategoryFormState,
  CreateCategorySchema,
} from '@/lib/models/categories'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CategorySchema = z.object({
  id: z.string().cuid(),
  description: z.string(),
  type: z.enum(['EXPENSE', 'RECEIPT', 'SAVING']),
  clusterId: z.string().cuid(),
})

const CategoryArraySchema = z.array(CategorySchema)

export async function getCategories() {
  const { clusterId } = await getSession()

  const cache = await getCache({ type: 'categories', id: clusterId })

  if (!cache) {
    const data = await revalidateCache(clusterId, true)
    return data
  }

  const parsed = CategoryArraySchema.safeParse(cache)

  return parsed.success ? parsed.data : []
}

export async function upsertCategory(
  formState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> {
  const { clusterId } = await getSession()

  const parsed = CreateCategorySchema.safeParse({
    id: formData.get('id'),
    description: formData.get('description'),
    type: formData.get('type'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await db.category.upsert({
      where: {
        id: parsed.data.id,
      },
      update: {
        description: parsed.data.description,
        type: parsed.data.type as $Enums.CategoryType,
        clusterId,
      },
      create: {
        description: parsed.data.description,
        type: parsed.data.type as $Enums.CategoryType,
        clusterId,
      },
    })

    await revalidateCache(clusterId)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/categories')
}

export async function deleteCategory(categoryId: string) {
  const { clusterId } = await getSession()
  await db.category.delete({
    where: { id: categoryId, clusterId },
  })
  await revalidateCache(clusterId)
}

export async function revalidateCache(clusterId: string, returnData?: boolean) {
  const dataToCache = await db.category.findMany({
    where: { clusterId },
    orderBy: { description: 'asc' },
  })

  await setCacheWithTTL({
    type: 'categories',
    id: clusterId,
    data: JSON.stringify(dataToCache),
    ttl: 'oneWeek',
  })

  revalidatePath('/')
  return returnData ? dataToCache : null
}
