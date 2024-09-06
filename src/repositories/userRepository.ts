import { Database } from '@/db/schema'
import { db } from '@/db'
import { UserData } from '@/interfaces/userData'

class UserRepository implements UserData {
  async fetchUser(name: string): Promise<Database['users'] | undefined> {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('name', 'ilike', name ?? '')
      .executeTakeFirst()

    return user
  }

  async fetchAllUsers(): Promise<Database['users'][] | []> {
    const users = await db.selectFrom('users').selectAll().execute()
    return users
  }
}

export const userRepository: UserData = new UserRepository()
