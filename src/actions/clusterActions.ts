'use server'

import { prisma } from '@/lib/prisma'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import {
  ClusterFormState,
  FindClusterFormState,
} from '@/lib/states/clusterState'
import { ClusterSchema, FindClusterSchema } from '@/lib/schemas/clusterSchema'
import { createId } from '@/utils/createId'
import { refreshSessionToken } from './authActions'
import { ClusterWithParticipantsAndInvites } from '@/lib/types/cluster'

export async function getClusterDetails(clusterId: string) {
  const cluster = await prisma.cluster.findFirst({
    where: { id: clusterId },
  })

  return cluster
}

export async function createCluster(
  formState: ClusterFormState,
  formData: FormData,
): Promise<ClusterFormState> {
  const parsed = ClusterSchema.safeParse({
    name: formData.get('name'),
    userId: formData.get('userId'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const clusterId = createId()

    await sql`SELECT create_cluster(${clusterId}, ${parsed.data.name}, ${parsed.data.userId})`

    const payload = {
      cluster: parsed.data.name,
      clusterId,
    }

    await refreshSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Internal server error' },
    }
  }

  redirect('/')
}

export async function findClusterByName(
  formState: FindClusterFormState,
  formData: FormData,
): Promise<FindClusterFormState> {
  const parsed = FindClusterSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const clusters = await prisma.cluster.findMany({
      select: { id: true, name: true },
      where: { name: { contains: parsed.data.name, mode: 'insensitive' } },
      take: 5,
    })

    return { clusters, errors: {} }
  } catch (err) {
    return {
      errors: {
        _form: 'Internal server error',
      },
    }
  }
}

export async function getClusterParticipantsAndInvites(clusterId: string) {
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

export async function sendClusterRequest(clusterId: string, userId: string) {
  const inviteId = createId()
  const res =
    await sql`SELECT send_cluster_request(${clusterId}, ${userId}, ${inviteId})`
  console.log(res)
}
