export interface ClusterCreate {
  name: string
  owner_id: number
}

export interface Cluster extends ClusterCreate {
  id: number
  created_at?: Date
  updated_at?: Date
}

export interface UserCreate {
  name: string
  email: string
  password: string
}

export interface User extends UserCreate {
  id: number
  created_at?: Date
  updated_at?: Date
  owned_cluster_id?: number
  cluster_id?: number
}
