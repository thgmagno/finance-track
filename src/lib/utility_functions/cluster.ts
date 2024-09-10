import { sql } from '@vercel/postgres'
import { ClusterWithParticipantsAndInvites } from '../types/cluster'
import { createId } from '@/utils/createId'

export const create = async (
  clusterId: string,
  clusterName: string,
  userId: string,
): Promise<void> => {
  try {
    await sql`
        SELECT create_cluster(${clusterId}, ${clusterName}, ${userId})
      `
  } catch (error) {
    console.error('Error creating cluster:', error)
    throw new Error('Failed to create cluster')
  }
}

export const getClusterWithParticipantsAndInvites = async (
  clusterId: string,
): Promise<ClusterWithParticipantsAndInvites> => {
  const { rows } = await sql`
                  SELECT 
                    c.id AS cluster_id,
                    c.name AS cluster_name,
                    c.owner_id AS cluster_owner_id,
                    u.id AS user_id,
                    u.name AS user_name,
                    ci.id AS invite_id,
                    inv.name AS invite_sender_name
                  FROM 
                      clusters c
                  LEFT JOIN 
                      users u ON u.cluster_id = c.id
                  LEFT JOIN 
                      cluster_invite ci ON ci.cluster_id = c.id
                      AND ci.status = 'pending'
                  LEFT JOIN 
                      users inv ON inv.id = ci.user_id
                  WHERE
                      c.id = ${clusterId}
                  ORDER BY 
                      c.id, u.id, ci.id;
                `
  const data: ClusterWithParticipantsAndInvites = {
    cluster: {
      id: '',
      name: '',
      ownerId: '',
    },
    invites: [],
    users: [],
  }

  rows.forEach((r) => {
    if (!data.cluster.id) {
      data.cluster.id = String(r.cluster_id)
      data.cluster.name = String(r.cluster_name)
      data.cluster.ownerId = String(r.owner_id)
    }

    if (r.invite_id) {
      data.invites.push({
        id: r.invite_id,
        senderName: r.invite_sender_name,
      })
    }

    if (r.user_id) {
      data.users.push({
        id: r.user_id,
        name: r.user_name,
      })
    }
  })

  return data
}

export const sendRequest = async (clusterId: string, userId: string) => {
  const inviteId = createId()

  try {
    const { rowCount } =
      await sql`SELECT send_cluster_request(${clusterId}, ${userId}, ${inviteId})`
    return rowCount
      ? { success: true, message: 'request sent' }
      : { success: false, message: 'internal error' }
  } catch (err) {
    return { success: false, message: 'internal error' }
  }
}
