interface Invite {
  clusterId: string
  clusterName: string
}

export interface DataUser {
  invites: Invite[]
}
