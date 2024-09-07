import { Cluster, User } from '@/lib/schemas/dbSchema'
import { createKysely } from '@vercel/postgres-kysely'

export interface Database {
  clusters: Cluster
  users: User
}

export const db = createKysely<Database>()
