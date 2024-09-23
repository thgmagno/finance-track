'use server'

import {
  CreateCategoryFormState,
  CreateCategorySchema,
} from '@/lib/models/categories'
import { db } from '@/server/db'
import { $Enums, Category } from '@prisma/client'
import { getSession } from '@/server/actions/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type AccCategoryType = {
  EXPENSE: Category[]
  RECEIPT: Category[]
  SAVING: Category[]
}

export async function getCategoriesGroupedByType(clusterId: string) {
  return db.category
    .findMany({
      where: { clusterId },
    })
    .then((data) =>
      data.reduce(
        (acc: AccCategoryType, category: Category) => {
          acc[category.type] = acc[category.type] || []
          acc[category.type].push(category)
          return acc
        },
        { EXPENSE: [], RECEIPT: [], SAVING: [] },
      ),
    )
}

export async function createCategory(
  formState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> {
  const { clusterId } = await getSession()

  if (typeof clusterId !== 'string') {
    return { errors: { _form: 'Parameters invalid' } }
  }

  const parsed = CreateCategorySchema.safeParse({
    description: formData.get('description'),
    type: formData.get('type'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await db.category.create({
      data: {
        description: parsed.data.description,
        type: parsed.data.type as $Enums.CategoryType,
        clusterId,
      },
    })
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  revalidatePath('/')
  redirect('/categories')
}
