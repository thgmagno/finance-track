'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BackdropBlur } from '@/components/modals/backdropBlur'
import { Card } from '@/components/modals/card'
import { CardHeader } from '@/components/modals/cardHeader'
import { CardBody } from '@/components/modals/cardBody'
import { useEffect, useState } from 'react'
import { getClusterDetails } from '@/actions/clusterActions'
import { getSession } from '@/actions/authActions'
import { capitalizeStr } from '@/utils/capitilizeStr'

export function ViewClusterButtonTrigger({ cluster }: { cluster: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('view', 'cluster')
    replace(`${pathname}?${params.toString()}`)
  }

  const open = searchParams.get('view') === 'cluster'

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-baseline gap-1 text-xs text-sky-600"
      >
        <div className="h-[6px] w-[6px] animate-pulse rounded-full bg-sky-500" />
        {cluster}
      </button>
      {open && <ViewCluster />}
    </>
  )
}

function ViewCluster() {
  const [cluster, setCluster] = useState({
    id: '',
    name: '',
  })

  useEffect(() => {
    const fetchCluster = async () => {
      const { clusterId } = await getSession()
      const cluster = await getClusterDetails(String(clusterId))
      cluster?.id && setCluster(cluster)
    }

    fetchCluster()
  }, [])

  return (
    <BackdropBlur>
      <Card>
        <CardHeader title="Cluster view" />
        <CardBody>
          <section>
            <article className="flex items-center justify-between rounded-md bg-zinc-50 p-2">
              <div className="flex -translate-y-1 flex-col">
                <label className="translate-y-1 text-sm text-zinc-600">
                  Name:
                </label>
                <span>
                  {cluster.name ? (
                    capitalizeStr(cluster.name)
                  ) : (
                    <span className="animate-pulse">Loading name...</span>
                  )}
                </span>
              </div>
              <button className="rounded-md border bg-zinc-100 px-2 py-1 shadow transition-all duration-200 hover:bg-zinc-200/80">
                Change name
              </button>
            </article>
            <article className="flex flex-col rounded-md bg-zinc-50 p-2">
              <label className="translate-y-1 text-sm text-zinc-600">
                Participants:
              </label>
              <article className="my-2">
                <div>
                  <span>Fulano</span>
                </div>
                <div>
                  <span>Cicrano</span>
                </div>
              </article>
            </article>
            <article className="flex flex-col rounded-md bg-zinc-50 p-2">
              <label className="translate-y-1 text-sm text-zinc-600">
                Invites:
              </label>
              <article className="my-2">
                <div>
                  <span>Fulano</span>
                </div>
                <div>
                  <span>Cicrano</span>
                </div>
              </article>
            </article>
          </section>
        </CardBody>
      </Card>
    </BackdropBlur>
  )
}
