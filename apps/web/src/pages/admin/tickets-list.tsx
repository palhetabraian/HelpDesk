import { Pencil } from 'lucide-react'

import { AdminLayout } from '../../components/layout/admin-layout'
import { TicketStatusBadge } from '../../components/ui/ticket-status-badge'
import type { TicketStatus } from '../../types/ticket'

type AdminTicket = {
  id: string
  updatedAt: string
  title: string
  service: string
  technician: string
  client: string
  status: TicketStatus
  totalValue: number
}

const adminTickets: AdminTicket[] = [
  {
    id: '00003',
    updatedAt: '13/04/25 20:56',
    title: 'Rede lenta',
    service: 'Instalação de Rede',
    technician: 'Carlos Silva',
    client: 'André Costa',
    status: 'ABERTO',
    totalValue: 180,
  },
  {
    id: '00004',
    updatedAt: '12/04/25 15:20',
    title: 'Backup não está funcionando',
    service: 'Recuperação de Dados',
    technician: 'Carlos Silva',
    client: 'André Costa',
    status: 'ABERTO',
    totalValue: 200,
  },
  {
    id: '00001',
    updatedAt: '12/04/25 09:01',
    title: 'Computador não liga',
    service: 'Manutenção de Hardware',
    technician: 'Carlos Silva',
    client: 'Aline Souza',
    status: 'EM_ATENDIMENTO',
    totalValue: 150,
  },
  {
    id: '00002',
    updatedAt: '10/04/25 10:15',
    title: 'Instalação de software de gestão',
    service: 'Suporte de Software',
    technician: 'Ana Oliveira',
    client: 'Julia Maria',
    status: 'ENCERRADO',
    totalValue: 200,
  },
  {
    id: '00005',
    updatedAt: '11/04/25 15:16',
    title: 'Meu fone não conecta no computador',
    service: 'Suporte de Software',
    technician: 'Ana Oliveira',
    client: 'Suzane Moura',
    status: 'ENCERRADO',
    totalValue: 80,
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

export function TicketsListPage() {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-blue-700">Chamados</h1>

        <section className="mt-6 hidden overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Atualizado em
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Id
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Título e Serviço
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Valor total
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Cliente
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Técnico
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {adminTickets.map((ticket) => (
                <tr key={ticket.id} className="transition hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {ticket.updatedAt}
                  </td>

                  <td className="px-4 py-3 text-xs font-bold text-slate-950">
                    {ticket.id}
                  </td>

                  <td className="px-4 py-3">
                    <strong className="block text-xs font-bold text-slate-950">
                      {ticket.title}
                    </strong>
                    <span className="mt-1 block text-[11px] text-slate-600">
                      {ticket.service}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs font-semibold text-slate-900">
                    {currencyFormatter.format(ticket.totalValue)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-[8px] font-bold text-white">
                        {getInitials(ticket.client)}
                      </span>

                      {ticket.client}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-[8px] font-bold text-white">
                        {getInitials(ticket.technician)}
                      </span>

                      {ticket.technician}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <TicketStatusBadge status={ticket.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      aria-label={`Ver chamado ${ticket.id}`}
                      className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                    >
                      <Pencil size={14} strokeWidth={2.2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 space-y-3 lg:hidden">
          {adminTickets.map((ticket) => (
            <article
              key={ticket.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-700">
                    #{ticket.id}
                  </span>

                  <strong className="mt-1.5 block text-sm font-bold text-slate-950">
                    {ticket.title}
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    {ticket.service}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <TicketStatusBadge status={ticket.status} />

                  <strong className="text-sm font-semibold text-slate-900">
                    {currencyFormatter.format(ticket.totalValue)}
                  </strong>
                </div>
              </div>

              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-[8px] font-bold text-white">
                    {getInitials(ticket.client)}
                  </span>

                  <span>Cliente: {ticket.client}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-[8px] font-bold text-white">
                    {getInitials(ticket.technician)}
                  </span>

                  <span>Técnico: {ticket.technician}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Atualizado em {ticket.updatedAt}
                </span>

                <button
                  type="button"
                  aria-label={`Ver chamado ${ticket.id}`}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                >
                  <Pencil size={14} strokeWidth={2.2} />
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  )
}
