import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ClientLayout } from '../../components/layout/client-layout'
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

export function ClientTicketDetailsPage() {
  const navigate = useNavigate()

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <ClientLayout>
      <div className="mx-auto w-full max-w-[900px] lg:pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 lg:text-xs"
        >
          <ArrowLeft size={16} strokeWidth={2.2} className="lg:size-3.5" />
          Voltar
        </button>

        <h1 className="mt-4 text-2xl font-bold text-blue-700 lg:mt-3 lg:text-2xl">
          Chamado detalhado
        </h1>

        <div className="mt-8 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,480px)_296px] lg:items-start lg:gap-6">
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-7 lg:min-h-[294px] lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-500 lg:text-xs">
                  {ticketDetails.id}
                </span>

                <h2 className="mt-4 text-xl font-bold text-[#1E2024] lg:mt-3 lg:text-sm">
                  {ticketDetails.title}
                </h2>
              </div>

              <TicketStatusBadge status={ticketDetails.status} />
            </div>

            <div className="mt-9 lg:mt-6">
              <span className="text-base font-bold text-slate-400 lg:text-xs">
                Descrição
              </span>
              <p className="mt-2 text-xl leading-relaxed text-[#1E2024] lg:max-w-[390px] lg:text-sm lg:leading-relaxed">
                {ticketDetails.description}
              </p>
            </div>

            <div className="mt-9 lg:mt-6">
              <span className="text-base font-bold text-slate-400 lg:text-xs">
                Categoria
              </span>
              <p className="mt-2 text-xl text-[#1E2024] lg:text-sm">
                {ticketDetails.category}
              </p>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-6 lg:mt-6">
              <div>
                <span className="text-base font-bold text-slate-400 lg:text-xs">
                  Criado em
                </span>
                <p className="mt-2 text-lg text-[#1E2024] lg:text-sm">
                  {ticketDetails.createdAt}
                </p>
              </div>

              <div>
                <span className="text-base font-bold text-slate-400 lg:text-xs">
                  Atualizado em
                </span>
                <p className="mt-2 text-lg text-[#1E2024] lg:text-sm">
                  {ticketDetails.updatedAt}
                </p>
              </div>
            </div>
          </section>

          <aside className="min-w-0 rounded-xl border border-slate-200 bg-white p-7 lg:min-h-[318px] lg:p-6">
            <span className="text-base font-bold text-slate-400 lg:text-xs">
              Técnico responsável
            </span>

            <div className="mt-5 flex items-center gap-4 lg:mt-4 lg:gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white lg:size-9 lg:text-xs">
                {getInitials(ticketDetails.technician.name)}
              </span>

              <div>
                <strong className="block text-xl font-medium text-[#1E2024] lg:text-sm">
                  {ticketDetails.technician.name}
                </strong>
                <span className="text-base text-slate-500 lg:text-xs">
                  {ticketDetails.technician.email}
                </span>
              </div>
            </div>

            <div className="mt-12 lg:mt-9">
              <span className="text-base font-bold text-slate-400 lg:text-xs">
                Valores
              </span>

              <div className="mt-6 space-y-5 text-lg lg:mt-4 lg:space-y-4 lg:text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#1E2024]">Preço base</span>
                  <strong className="font-medium text-[#1E2024]">
                    {currencyFormatter.format(ticketDetails.basePrice)}
                  </strong>
                </div>

                <div className="pt-2">
                  <span className="text-base font-bold text-slate-400 lg:text-xs">
                    Adicionais
                  </span>

                  <div className="mt-4 space-y-3 lg:mt-3 lg:space-y-2">
                    {ticketDetails.additionalServices.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-[#1E2024]">{service.name}</span>
                        <strong className="font-medium text-[#1E2024]">
                          {currencyFormatter.format(service.price)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-6 lg:pt-4">
                  <strong className="text-xl text-[#1E2024] lg:text-sm">
                    Total
                  </strong>
                  <strong className="text-xl text-[#1E2024] lg:text-sm">
                    {currencyFormatter.format(ticketDetails.total)}
                  </strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ClientLayout>
  )
}
