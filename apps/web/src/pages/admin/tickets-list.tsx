import { AdminLayout } from '../../components/layout/admin-layout'
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
      </div>
    </AdminLayout>
  )
}
