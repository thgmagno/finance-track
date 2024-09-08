export interface CreateUser {
  name: string
  email: string
  password: string
}

export interface User extends CreateUser {
  id: number
  cluster_id?: number | null
  created_at: Date
  updated_at: Date
}

export interface CreateCluster {
  name: string
  owner_id: number
}

export interface Cluster extends CreateCluster {
  id?: number
  created_at?: Date
  updated_at?: Date
}

export interface CreateMaster {
  key: string
  value: string
  cluster_id: number
}

export interface Master extends CreateMaster {
  id: number
}

export interface CreateClusterInvite {
  cluster_id: number
  user_id: number
  status: 'pending' | 'accepted' | 'rejected'
}

export interface ClusterInvite extends CreateClusterInvite {
  id: number
  created_at: Date
}
