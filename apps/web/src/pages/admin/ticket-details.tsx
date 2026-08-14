import { ArrowLeft, CheckCircle, Clock } from 'lucide-react'

import { AdminLayout } from '../../components/layout/admin-layout'
import { TicketStatusBadge } from '../../components/ui/ticket-status-badge'

const ticketDetails = {
  id: '00004',
  title: 'Backup não está funcionando',
  status: 'ABERTO',
  description:
    'O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.',
  category: 'Recuperação de Dados',
  createdAt: '12/04/25 09:12',
  updatedAt: '12/04/25 15:20',
  client: {
    name: 'André Costa',
  },
  technician: {
    name: 'Carlos Silva',
    email: 'carlos.silva@test.com',
  },
  basePrice: 200,
  additionalServices: [
    {
      name: 'Assinatura de backup',
      price: 120,
    },
    {
      name: 'Formatação do PC',
      price: 75,
    },
  ],
  total: 395,
} as const

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function TicketDetailsPage() {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <AdminLayout>
      <div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={14} strokeWidth={2.2} />
          Voltar
        </button>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-blue-700">
            Chamado detalhado
          </h1>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-200 px-5 text-xs font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              <Clock size={14} strokeWidth={2.2} />
              Em atendimento
            </button>

            <button
              type="button"
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-200 px-5 text-xs font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              <CheckCircle size={14} strokeWidth={2.2} />
              Encerrado
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  {ticketDetails.id}
                </span>

                <h2 className="mt-3 text-sm font-bold text-slate-950">
                  {ticketDetails.title}
                </h2>
              </div>

              <TicketStatusBadge status={ticketDetails.status} />
            </div>

            <div className="mt-6">
              <span className="text-xs font-semibold text-slate-500">
                Descrição
              </span>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-700">
                {ticketDetails.description}
              </p>
            </div>

            <div className="mt-5">
              <span className="text-xs font-semibold text-slate-500">
                Categoria
              </span>
              <p className="mt-2 text-sm text-slate-900">
                {ticketDetails.category}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Criado em
                </span>
                <p className="mt-2 text-sm text-slate-900">
                  {ticketDetails.createdAt}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Atualizado em
                </span>
                <p className="mt-2 text-sm text-slate-900">
                  {ticketDetails.updatedAt}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-xs font-semibold text-slate-500">
                Cliente
              </span>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-900">
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-[8px] font-bold text-white">
                  {getInitials(ticketDetails.client.name)}
                </span>
                {ticketDetails.client.name}
              </div>
            </div>
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-5">
            <span className="text-xs font-semibold text-slate-500">
              Técnico responsável
            </span>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                {getInitials(ticketDetails.technician.name)}
              </span>

              <div>
                <strong className="block text-sm font-semibold text-slate-950">
                  {ticketDetails.technician.name}
                </strong>
                <span className="text-xs text-slate-500">
                  {ticketDetails.technician.email}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-xs font-semibold text-slate-500">
                Valores
              </span>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-700">Preço base</span>
                  <strong className="font-medium text-slate-900">
                    {currencyFormatter.format(ticketDetails.basePrice)}
                  </strong>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Adicionais
                  </span>

                  <div className="mt-3 space-y-2">
                    {ticketDetails.additionalServices.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-slate-700">{service.name}</span>
                        <strong className="font-medium text-slate-900">
                          {currencyFormatter.format(service.price)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <strong className="text-slate-950">Total</strong>
                  <strong className="text-slate-950">
                    {currencyFormatter.format(ticketDetails.total)}
                  </strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  )
}
