import { Cluster, ClusterInvite, Master, User } from '@/lib/schemas/dbSchema'
import { createKysely } from '@vercel/postgres-kysely'

export interface Database {
  clusters: Cluster
  users: User
  master: Master
  clusterInvite: ClusterInvite
}

export const db = createKysely<Database>()
