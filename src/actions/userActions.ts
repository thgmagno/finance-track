'use server'

import { db } from '@/db'

export async function getUserDetails({
  name,
  email,
}: {
  name?: string
  email?: string
}) {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where((eb) =>
      eb.or([
        eb('name', 'ilike', `%${name}%` ?? ''),
        eb('email', 'ilike', `%${email}%` ?? ''),
      ]),
    )
    .executeTakeFirst()

  return user
}
