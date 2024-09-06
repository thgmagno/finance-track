interface Cluster {
  id?: number
  name: string
  created_at?: string
  updated_at?: string
  owner_id: number
}

interface User {
  id?: number
  name: string
  email: string
  password: string
  created_at?: string
  updated_at?: string
  owned_cluster_id?: number
  cluster_id?: number
}

export interface Database {
  clusters: Cluster
  users: User
}
