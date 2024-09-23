'use server'

import {
  CreateTransactionFormState,
  CreateTransactionSchema,
  GetTransactionSchema,
} from '@/lib/models/transactions'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from '../authentication/session'
import { redirect } from 'next/navigation'

interface Props {
  categoryDescription?: string
  year?: string
  month?: string
}

export async function getTransactions({
  categoryDescription,
  year,
  month,
}: Props) {
  const { clusterId } = await getSession()

  if (typeof clusterId !== 'string') {
    return {
      success: false,
      message: 'Is needed to create cluster for manage transactions',
    }
  }

  const parsed = GetTransactionSchema.safeParse({
    categoryDescription,
    year,
    month,
  })

  if (!parsed.success) {
    return { success: false, message: 'Parameters are invalid' }
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          ...(parsed.data.categoryDescription && {
            description: {
              contains: parsed.data.categoryDescription,
              mode: 'insensitive',
            },
          }),
          ...(parsed.data.year && { year: { equals: parsed.data.year } }),
          ...(parsed.data.month && { month: { equals: parsed.data.month } }),
        },
      ],
      AND: { clusterId },
    },
    include: { category: true },
  })

  return { success: true, data: transactions }
}

export async function createTransaction(
  formState: CreateTransactionFormState,
  formData: FormData,
): Promise<CreateTransactionFormState> {
  const { clusterId } = await getSession()

  if (typeof clusterId !== 'string') {
    return { errors: { _form: 'Parameters invalid' } }
  }

  const parsed = CreateTransactionSchema.safeParse({
    description: formData.get('description'),
    amount: formData.get('amount'),
    year: formData.get('year'),
    month: formData.get('month'),
    categoryId: formData.get('categoryId'),
  })

  if (!parsed.success) {
    console.log(parsed.error)
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.transaction.create({
      data: {
        description: parsed.data.description,
        amount: parsed.data.amount,
        year: parsed.data.year,
        month: parsed.data.month,
        categoryId: parsed.data.categoryId,
        clusterId,
      },
    })
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  revalidatePath('/')
  redirect('/')
}
