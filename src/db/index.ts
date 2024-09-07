import { Cluster } from '@/interfaces/cluster'
import { User } from '@/interfaces/user'
import { createKysely } from '@vercel/postgres-kysely'

export interface Database {
  clusters: Cluster
  users: User
}

export const db = createKysely<Database>()
