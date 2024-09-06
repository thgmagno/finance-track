import { Database } from '@/db/schema'

export interface IUserDataFetcher {
  fetchUser(
    name?: string,
    email?: string,
  ): Promise<Database['users'] | undefined>
  fetchAllUsers(): Promise<Database['users'][] | []>
}
