'use server'

import {
  CreateCategoryFormState,
  CreateCategorySchema,
} from '@/lib/models/categories'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '../authentication/session'
import { $Enums } from '@prisma/client'

export async function getCategory(type?: 'EXPENSE' | 'RECEIPT' | 'SAVING') {
  return prisma.category.findMany({
    where: { type },
    orderBy: { description: 'asc' },
  })
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
    await prisma.category.create({
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
