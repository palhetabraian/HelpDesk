import { ArrowLeft, CheckCircle, Clock, Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { TechnicianLayout } from '../../components/layout/technician-layout'
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

export function TechnicianTicketDetailsPage() {
  const navigate = useNavigate()

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <TechnicianLayout>
      <div className="mx-auto w-full max-w-[820px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-[11px] font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          Voltar
        </button>

        <div className="mt-2.5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-bold text-blue-700 md:text-2xl">
            Chamado detalhado
          </h1>

          <div className="grid grid-cols-2 gap-2 md:flex">
            <button
              type="button"
              aria-label="Iniciar atendimento"
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1E2024] px-4 text-xs font-semibold text-white transition hover:bg-zinc-800 md:min-w-[132px]"
            >
              <Clock size={14} strokeWidth={2.2} />
              Iniciar atendimento
            </button>

            <button
              type="button"
              aria-label="Encerrar chamado"
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-300 hover:text-slate-900 md:min-w-[104px]"
            >
              <CheckCircle size={14} strokeWidth={2.2} />
              Encerrar
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-5">
          <div className="grid gap-4">
            <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
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

              <div className="mt-5">
                <span className="text-xs font-semibold text-slate-500">
                  Descrição
                </span>
                <p className="mt-2 w-full text-sm leading-relaxed text-slate-700">
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

              <div className="mt-5">
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

            <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-500">
                  Serviços adicionais
                </span>

                <button
                  type="button"
                  aria-label="Adicionar serviço ao chamado"
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#1E2024] text-white transition hover:bg-zinc-800"
                >
                  <Plus size={15} strokeWidth={2.4} />
                </button>
              </div>

              <div className="mt-5 divide-y divide-slate-100">
                {ticketDetails.additionalServices.map((service) => (
                  <div
                    key={service.name}
                    className="grid grid-cols-[1fr_auto_32px] items-center gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <strong className="text-sm font-semibold text-slate-900">
                      {service.name}
                    </strong>

                    <span className="text-sm font-medium text-slate-900">
                      {currencyFormatter.format(service.price)}
                    </span>

                    <button
                      type="button"
                      aria-label={`Remover serviço ${service.name}`}
                      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-red-50 text-red-500 transition hover:bg-red-100"
                    >
                      <Trash2 size={14} strokeWidth={2.2} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
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

            <div className="mt-7">
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

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-slate-700">Adicionais</span>
                  <strong className="font-medium text-slate-900">
                    {currencyFormatter.format(
                      ticketDetails.additionalServices.reduce(
                        (total, service) => total + service.price,
                        0,
                      ),
                    )}
                  </strong>
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
    </TechnicianLayout>
  )
}
