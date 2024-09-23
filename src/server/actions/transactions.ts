'use server'

import {
  CreateTransactionFormState,
  CreateTransactionSchema,
} from '@/lib/models/transactions'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/server/actions/session'

export async function getCurrentTransactions(clusterId: string) {
  const currentDate = new Date()

  return db.transaction.findMany({
    where: {
      clusterId,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    },
  })
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
    isClosed: formData.get('isClosed'),
  })

  if (!parsed.success) {
    console.log(formData, parsed.error)
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const status = parsed.data.isClosed ? 'CLOSE' : 'OPEN'
    await db.transaction.create({
      data: {
        description: parsed.data.description,
        amount: parsed.data.amount,
        year: parsed.data.year,
        month: parsed.data.month,
        categoryId: parsed.data.categoryId,
        clusterId,
        status,
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
