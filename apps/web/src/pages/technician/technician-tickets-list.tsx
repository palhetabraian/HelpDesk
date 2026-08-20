import {
  CheckCircle,
  CircleHelp,
  Clock,
  Pencil,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

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

type TicketSection = {
  title: string
  status: TicketStatus
}

const ticketSections: TicketSection[] = [
  {
    title: 'Em atendimento',
    status: 'EM_ATENDIMENTO',
  },
  {
    title: 'Aberto',
    status: 'ABERTO',
  },
  {
    title: 'Encerrado',
    status: 'ENCERRADO',
  },
]

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
  {
    id: '00002',
    title: 'Instalação de software',
    service: 'Suporte de Software',
    price: 'R$ 200,00',
    updatedAt: '10/04/25 10:15',
    client: 'Julia Maria',
    status: 'ABERTO',
  },
  {
    id: '00005',
    title: 'Meu fone não conecta',
    service: 'Suporte de Software',
    price: 'R$ 80,00',
    updatedAt: '11/04/25 15:16',
    client: 'Suzane Moura',
    status: 'ENCERRADO',
  },
]

const statusIconConfig: Record<
  TicketStatus,
  {
    icon: LucideIcon
    className: string
  }
> = {
  ABERTO: {
    icon: CircleHelp,
    className: 'bg-pink-100 text-pink-600 ring-pink-200',
  },
  EM_ATENDIMENTO: {
    icon: Clock,
    className: 'bg-blue-100 text-blue-600 ring-blue-200',
  },
  ENCERRADO: {
    icon: CheckCircle,
    className: 'bg-green-100 text-green-700 ring-green-200',
  },
}

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

function TechnicianTicketCard({ ticket }: { ticket: TechnicianTicket }) {
  const action = getTicketAction(ticket)
  const ActionIcon = action.icon
  const statusConfig = statusIconConfig[ticket.status]
  const StatusIcon = statusConfig.icon
  const canChangeStatus = ticket.status !== 'ENCERRADO'

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className="text-base font-bold text-slate-400">{ticket.id}</span>

        <div className="flex items-center gap-2">
          <Link
            to={`/technician/tickets/${ticket.id}`}
            aria-label={`Editar chamado ${ticket.id}`}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
          >
            <Pencil size={18} strokeWidth={2} />
          </Link>

          {canChangeStatus && (
            <button
              type="button"
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1E2024] px-4 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              <ActionIcon size={18} strokeWidth={2.2} />
              {action.label}
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-xl font-bold leading-tight text-[#1E2024]">
          {ticket.title}
        </h2>
        <p className="mt-1 text-base leading-tight text-[#1E2024]">
          {ticket.service}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="text-base font-medium text-[#1E2024]">
          {ticket.updatedAt}
        </span>
        <strong className="text-base font-bold text-[#1E2024]">
          {ticket.price}
        </strong>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
            {getInitials(ticket.client)}
          </span>
          <span className="text-base font-bold text-[#1E2024]">
            {ticket.client}
          </span>
        </div>

        <span
          className={[
            'inline-flex size-9 items-center justify-center rounded-full ring-1',
            statusConfig.className,
          ].join(' ')}
          aria-label={`Status do chamado ${ticket.id}`}
        >
          <StatusIcon size={20} strokeWidth={2.4} />
        </span>
      </div>
    </article>
  )
}

export function TechnicianTicketsListPage() {
  return (
    <TechnicianLayout>
      <div className="w-full max-w-[1110px]">
        <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
          Meus chamados
        </h1>

        <div className="mt-7 grid gap-8">
          {ticketSections.map((section) => {
            const tickets = technicianTickets.filter(
              (ticket) => ticket.status === section.status,
            )

            if (tickets.length === 0) {
              return null
            }

            return (
              <section key={section.status}>
                <div className="mb-4">
                  <TicketStatusBadge status={section.status} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {tickets.map((ticket) => (
                    <TechnicianTicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </TechnicianLayout>
  )
}
