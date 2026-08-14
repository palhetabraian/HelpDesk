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
}

const adminTickets: AdminTicket[] = [
  {
    id: '00004',
    updatedAt: '13/04/25 20:56',
    title: 'Rede lenta',
    service: 'Instalação de Rede',
    technician: 'Carlos Silva',
    client: 'André Costa',
    status: 'ABERTO',
  },
  {
    id: '00003',
    updatedAt: '12/04/25 15:20',
    title: 'Backup não está funcionando',
    service: 'Recuperação de Dados',
    technician: 'Ana Oliveira',
    client: 'Julia Maria',
    status: 'EM_ATENDIMENTO',
  },
  {
    id: '00002',
    updatedAt: '12/04/25 09:01',
    title: 'Computador não liga',
    service: 'Manutenção de Hardware',
    technician: 'Cíntia Lúcia',
    client: 'Aline Souza',
    status: 'ENCERRADO',
  },
]

export function TicketsListPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-blue-700">Chamados</h1>

        <p className="mt-2 text-sm text-slate-600">
          Lista de chamados do sistema.
        </p>

        <p className="mt-4 text-sm font-medium text-slate-700">
          {adminTickets.length} chamados encontrados.
        </p>

        <section className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Atualização
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Título / Serviço
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Técnico
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Cliente
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {adminTickets.map((ticket) => (
                <tr key={ticket.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {ticket.updatedAt}
                  </td>

                  <td className="px-5 py-4">
                    <strong className="block text-sm font-semibold text-slate-900">
                      {ticket.title}
                    </strong>
                    <span className="mt-1 block text-xs text-slate-500">
                      {ticket.service}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.technician}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.client}
                  </td>

                  <td className="px-5 py-4">
                    <TicketStatusBadge status={ticket.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Ver chamado ${ticket.id}`}
                      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                    >
                      ›
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AdminLayout>
  )
}
