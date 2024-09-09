export interface ClusterFormState {
  errors: {
    name?: string[]
    userId?: string[]
    _form?: string
  }
}

export interface FindClusterFormState {
  clusters?: {
    id: string
    name: string
  }[]
  errors: {
    name?: string[]
    _form?: string
  }
}
