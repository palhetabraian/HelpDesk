import {
  CheckCircle,
  CircleHelp,
  Clock,
  Eye,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ClientLayout } from '../../components/layout/client-layout'
import { TicketStatusBadge } from '../../components/ui/ticket-status-badge'
import type { TicketStatus } from '../../types/ticket'

type ClientTicket = {
  id: string
  updatedAt: string
  title: string
  service: string
  technician: string
  status: TicketStatus
  totalValue: number
}

const clientTickets: ClientTicket[] = [
  {
    id: '00003',
    updatedAt: '13/04/25 20:56',
    title: 'Rede lenta',
    service: 'Instalação de Rede',
    technician: 'Carlos Silva',
    status: 'ABERTO',
    totalValue: 180,
  },
  {
    id: '00004',
    updatedAt: '12/04/25 15:20',
    title: 'Backup não está funcionando',
    service: 'Recuperação de Dados',
    technician: 'Carlos Silva',
    status: 'ABERTO',
    totalValue: 200,
  },
  {
    id: '00001',
    updatedAt: '12/04/25 09:01',
    title: 'Computador não liga',
    service: 'Manutenção de Hardware',
    technician: 'Carlos Silva',
    status: 'EM_ATENDIMENTO',
    totalValue: 150,
  },
  {
    id: '00002',
    updatedAt: '10/04/25 10:15',
    title: 'Instalação de software de gestão',
    service: 'Suporte de Software',
    technician: 'Ana Oliveira',
    status: 'ENCERRADO',
    totalValue: 200,
  },
  {
    id: '00005',
    updatedAt: '11/04/25 15:16',
    title: 'Meu fone não conecta no computador',
    service: 'Suporte de Software',
    technician: 'Ana Oliveira',
    status: 'ENCERRADO',
    totalValue: 80,
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

function StatusIconBadge({ status }: { status: TicketStatus }) {
  const statusConfig = statusIconConfig[status]
  const Icon = statusConfig.icon

  return (
    <span
      className={[
        'inline-flex size-7 items-center justify-center rounded-full ring-1',
        statusConfig.className,
      ].join(' ')}
      aria-label={`Status ${status}`}
    >
      <Icon size={15} strokeWidth={2.4} />
    </span>
  )
}

export function ClientTicketsListPage() {
  const navigate = useNavigate()

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  function handleViewTicket(ticketId: string) {
    navigate(`/client/tickets/${ticketId}`)
  }

  return (
    <ClientLayout>
      <div className="w-full">
        <h1 className="text-xl font-bold text-blue-700 lg:text-4xl">
          Meus chamados
        </h1>

        <section className="mt-8 hidden overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="w-[12%] px-4 py-5 text-sm font-bold text-slate-500">
                  Atualizado em
                </th>
                <th className="w-[8%] px-4 py-5 text-sm font-bold text-slate-500">
                  Id
                </th>
                <th className="w-[20%] px-4 py-5 text-sm font-bold text-slate-500">
                  Título
                </th>
                <th className="w-[18%] px-4 py-5 text-sm font-bold text-slate-500">
                  Serviço
                </th>
                <th className="w-[13%] px-4 py-5 text-sm font-bold text-slate-500">
                  Valor total
                </th>
                <th className="w-[14%] px-4 py-5 text-sm font-bold text-slate-500">
                  Técnico
                </th>
                <th className="w-[15%] px-4 py-5 text-sm font-bold text-slate-500">
                  Status
                </th>
                <th className="w-16 px-4 py-5 text-right">
                  <span className="sr-only">Ação</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {clientTickets.map((ticket) => (
                <tr key={ticket.id} className="h-[74px] transition hover:bg-slate-50">
                  <td className="px-4 py-4 text-sm text-[#1E2024]">
                    {ticket.updatedAt}
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-[#1E2024]">
                    {ticket.id}
                  </td>

                  <td className="px-4 py-4">
                    <strong className="block max-w-[210px] truncate text-sm font-bold text-[#1E2024]">
                      {ticket.title}
                    </strong>
                  </td>

                  <td className="px-4 py-4 text-sm text-[#1E2024]">
                    {ticket.service}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-[#1E2024]">
                    {currencyFormatter.format(ticket.totalValue)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#1E2024]">
                      <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                        {getInitials(ticket.technician)}
                      </span>

                      {ticket.technician}
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <TicketStatusBadge status={ticket.status} />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleViewTicket(ticket.id)}
                      aria-label={`Visualizar chamado ${ticket.id}`}
                      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-[#1E2024] transition hover:bg-slate-300"
                    >
                      <Eye size={18} strokeWidth={2.2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white lg:hidden">
          <div className="grid grid-cols-[66px_1fr_46px_34px] items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-3">
            <span className="text-xs font-bold text-slate-400">Atualiz...</span>
            <span className="text-xs font-bold text-slate-400">Título</span>
            <span className="text-xs font-bold text-slate-400">Status</span>
            <span className="sr-only">Ação</span>
          </div>

          <div className="divide-y divide-slate-200">
            {clientTickets.map((ticket) => (
              <article
                key={ticket.id}
                className="grid min-h-[54px] grid-cols-[66px_1fr_46px_34px] items-center gap-2 px-3 py-2.5"
              >
                <span className="whitespace-pre-line text-xs font-medium leading-snug text-[#1E2024]">
                  {ticket.updatedAt.replace(' ', '\n')}
                </span>

                <strong className="line-clamp-2 text-xs font-bold leading-snug text-[#1E2024]">
                  {ticket.title}
                </strong>

                <StatusIconBadge status={ticket.status} />

                <button
                  type="button"
                  onClick={() => handleViewTicket(ticket.id)}
                  aria-label={`Visualizar chamado ${ticket.id}`}
                  className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-[#1E2024] transition hover:bg-slate-300"
                >
                  <Eye size={14} strokeWidth={2.2} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </ClientLayout>
  )
}
