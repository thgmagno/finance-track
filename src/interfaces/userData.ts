import { Database } from '@/db/schema'

export interface UserData {
  fetchUser(
    name?: string,
    email?: string,
  ): Promise<Database['users'] | undefined>
  fetchAllUsers(): Promise<Database['users'][] | []>
}
