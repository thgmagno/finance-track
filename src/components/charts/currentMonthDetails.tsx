'use client'

import {
  arrowUpSharp,
  arrowUpCircleSharp,
  arrowDownCircleSharp,
  arrowDownSharp,
} from 'ionicons/icons'
import { IonIcon } from '@ionic/react'
import { formatDistanceToNow, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function CurrentMonthDetails() {
  const currentMonth = new Date().toLocaleDateString('pt-br', {
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="m-8 mx-auto mt-12 max-w-md rounded-lg border bg-zinc-100/40 p-8">
      <h1 className="text-xl opacity-75">
        {currentMonth.charAt(0).toUpperCase().concat(currentMonth.slice(1))}
      </h1>
      <hr className="my-4 border border-zinc-300" />

      {/* extract */}
      <section className="flex flex-col space-y-5">
        <article>
          <div className="flex justify-between text-sm">
            <span>
              {formatDistanceToNow(subDays(new Date(), 1), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
            <div className="flex gap-2">
              <span className="flex items-center">
                <IonIcon icon={arrowUpSharp} color="danger" /> R$68,00
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowUpCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Cartão de débito</span>
              <span>Pedágio</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$8,50
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowUpCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Cartão de débito</span>
              <span>Lanche</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$59,50
              </span>
            </div>
          </div>
        </article>

        <article>
          <div className="flex justify-between text-sm">
            <span>
              {formatDistanceToNow(subDays(new Date(), 7), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
            <div className="flex gap-2">
              <span className="flex items-center">
                <IonIcon icon={arrowDownSharp} color="success" /> R$20,00
              </span>
              <span className="flex items-center">
                <IonIcon icon={arrowUpSharp} color="danger" /> R$55,11
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowUpCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Saída Pix</span>
              <span>Pix Enviado</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$55,11
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowDownCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Entrada Pix</span>
              <span>Pix Recebido</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$20,00
              </span>
            </div>
          </div>
        </article>

        <article>
          <div className="flex justify-between text-sm">
            <span>
              {formatDistanceToNow(subDays(new Date(), 9), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
            <div className="flex gap-2">
              <span className="flex items-center">
                <IonIcon icon={arrowUpSharp} color="danger" /> R$92,30
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowUpCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Cartão de crédito</span>
              <span>Supermercado</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$70,00
              </span>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <IonIcon
              icon={arrowUpCircleSharp}
              size="large"
              className="mr-5 opacity-70"
            />
            <div className="flex flex-col text-xs md:text-sm">
              <span>Cartão de Débito</span>
              <span>Estacionamento</span>
              <span className="mt-0.5 w-fit rounded-md bg-zinc-800/70 px-2 py-0.5 font-medium tracking-wide text-zinc-100">
                R$22,30
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
