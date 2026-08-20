import { CheckCircle, PlayCircle } from 'lucide-react'

import { TechnicianLayout } from '../../components/layout/technician-layout'
import { TicketStatusBadge } from '../../components/ui/ticket-status-badge'
import type { TicketStatus } from '../../types/ticket'

type TechnicianTicket = {
  id: string
  title: string
  service: string
  price: string
  updatedAt: string
  client: string
  status: TicketStatus
}

const technicianTickets: TechnicianTicket[] = [
  {
    id: '00003',
    title: 'Rede lenta',
    service: 'Instalação de Rede',
    price: 'R$ 200,00',
    updatedAt: '10/04/25 15:13',
    client: 'André Costa',
    status: 'EM_ATENDIMENTO',
  },
  {
    id: '00004',
    title: 'Backup não está funcionando',
    service: 'Recuperação de Dados',
    price: 'R$ 200,00',
    updatedAt: '12/04/25 15:20',
    client: 'André Costa',
    status: 'ABERTO',
  },
  {
    id: '00001',
    title: 'Computador não liga',
    service: 'Manutenção de Hardware',
    price: 'R$ 150,00',
    updatedAt: '12/04/25 09:01',
    client: 'Aline Souza',
    status: 'ABERTO',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getTicketAction(ticket: TechnicianTicket) {
  if (ticket.status === 'EM_ATENDIMENTO') {
    return {
      label: 'Encerrar',
      icon: CheckCircle,
    }
  }

  return {
    label: 'Iniciar',
    icon: PlayCircle,
  }
}

export function TechnicianTicketsListPage() {
  return (
    <TechnicianLayout>
      <div className="mx-auto w-full max-w-[980px]">
        <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
          Meus chamados
        </h1>

        <section className="mt-6 grid gap-3 lg:gap-4">
          {technicianTickets.map((ticket) => {
            const action = getTicketAction(ticket)
            const ActionIcon = action.icon

            return (
              <article
                key={ticket.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid lg:grid-cols-[110px_1fr_120px_150px_132px] lg:items-center lg:gap-5 lg:p-5"
              >
                <div className="flex items-start justify-between gap-3 lg:block">
                  <span className="text-xs font-bold text-slate-500">
                    {ticket.id}
                  </span>

                  <div className="lg:mt-4">
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </div>

                <div className="mt-4 lg:mt-0">
                  <h2 className="text-sm font-bold text-slate-950">
                    {ticket.title}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {ticket.service}
                  </p>
                </div>

                <strong className="mt-4 block text-sm font-bold text-slate-950 lg:mt-0">
                  {ticket.price}
                </strong>

                <div className="mt-4 flex items-center gap-2 lg:mt-0">
                  <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                    {getInitials(ticket.client)}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {ticket.client}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 lg:mt-0 lg:justify-end lg:border-0 lg:pt-0">
                  <span className="text-xs font-medium text-slate-500 lg:hidden">
                    {ticket.updatedAt}
                  </span>

                  <button
                    type="button"
                    className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                  >
                    <ActionIcon size={14} strokeWidth={2.2} />
                    {action.label}
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </TechnicianLayout>
  )
}
