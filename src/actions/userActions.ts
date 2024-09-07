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

export async function listUsers() {
  const users = await db
    .selectFrom('users')
    .select([
      'id',
      'name',
      'email',
      'created_at',
      'updated_at',
      'owned_cluster_id',
      'cluster_id',
    ])
    .execute()
  return users
}
