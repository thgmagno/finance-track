export type ClusterWithParticipantsAndInvites = {
  cluster: {
    id: string
    name: string
    ownerId: string
  }
  invites: {
    id?: string
    senderName?: string
  }[]
  users: {
    id: string
    name: string
  }[]
}
