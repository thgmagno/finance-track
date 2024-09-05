import { kv } from '@vercel/kv'
import { UserData, UserDataFetcher } from './userDataFetcher'

export class KVUserDataFetcher implements UserDataFetcher {
  async fetchUser(name: string): Promise<UserData | null> {
    const user = await kv.hget<UserData>('user', name)
    return user ? JSON.parse(JSON.stringify(user)) : null
  }

  async fetchAllUsers(): Promise<UserData[]> {
    const usersRecord = await kv.hgetall<Record<string, UserData>>('user')
    const users = usersRecord ? Object.values(usersRecord) : []
    return users
  }
}
