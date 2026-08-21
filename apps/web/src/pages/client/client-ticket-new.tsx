import { ChevronDown } from 'lucide-react'

import { ClientLayout } from '../../components/layout/client-layout'

const ticketDraft = {
  title: 'Backup não está funcionando',
  description:
    'O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.',
  category: 'Recuperação de Dados',
  summaryCategory: 'Erro de rede',
  initialCost: 200,
}

export function ClientTicketNewPage() {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <ClientLayout>
      <div className="mx-auto w-full max-w-[900px] lg:pt-2">
        <h1 className="text-3xl font-bold text-blue-700 lg:text-3xl">
          Novo chamado
        </h1>

        <div className="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,480px)_296px] lg:items-start lg:gap-6">
          <section className="rounded-xl border border-slate-200 bg-white px-7 py-8 lg:min-h-[456px] lg:px-8 lg:py-9">
            <h2 className="text-2xl font-bold text-[#1E2024] lg:text-xl">
              Informações
            </h2>

            <p className="mt-2 max-w-[420px] text-lg leading-relaxed text-slate-500 lg:text-base">
              Configure os dias e horários em que você está disponível para
              atender chamados
            </p>

            <form className="mt-9 space-y-8">
              <div>
                <label
                  htmlFor="ticket-title"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600 lg:text-xs"
                >
                  Título
                </label>

                <input
                  id="ticket-title"
                  name="title"
                  defaultValue={ticketDraft.title}
                  placeholder="Digite um título para o chamado"
                  className="mt-3 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-2xl text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700 lg:text-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="ticket-description"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600 lg:text-xs"
                >
                  Descrição
                </label>

                <textarea
                  id="ticket-description"
                  name="description"
                  defaultValue={ticketDraft.description}
                  placeholder="Descreva o que está acontecendo"
                  rows={5}
                  className="mt-3 w-full resize-none border-0 border-b border-slate-200 bg-transparent pb-3 text-2xl leading-relaxed text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700 lg:h-[164px] lg:text-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="ticket-category"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600 lg:text-xs"
                >
                  Categoria de serviço
                </label>

                <div className="relative mt-3">
                  <select
                    id="ticket-category"
                    name="category"
                    defaultValue={ticketDraft.category}
                    className="w-full cursor-pointer appearance-none border-0 border-b border-slate-200 bg-transparent pb-3 pr-10 text-2xl text-[#1E2024] outline-none focus:border-blue-700 lg:text-xl"
                  >
                    <option>Selecione a categoria de atendimento</option>
                    <option>Recuperação de Dados</option>
                    <option>Instalação de Rede</option>
                    <option>Manutenção de Hardware</option>
                    <option>Suporte de Software</option>
                  </select>

                  <ChevronDown
                    size={24}
                    strokeWidth={2.2}
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </form>
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white px-7 py-8 lg:min-h-[324px] lg:px-8 lg:py-8">
            <h2 className="text-2xl font-bold text-[#1E2024] lg:text-xl">
              Resumo
            </h2>

            <p className="mt-2 text-lg text-slate-500 lg:text-base">
              Valores e detalhes
            </p>

            <div className="mt-9">
              <span className="text-lg font-bold text-slate-400 lg:text-base">
                Categoria de serviço
              </span>
              <p className="mt-2 text-xl text-[#1E2024]">
                {ticketDraft.summaryCategory}
              </p>
            </div>

            <div className="mt-9">
              <span className="text-lg font-bold text-slate-400 lg:text-base">
                Custo inicial
              </span>
              <p className="mt-3 text-3xl font-bold text-[#1E2024]">
                {currencyFormatter.format(ticketDraft.initialCost)}
              </p>
            </div>

            <p className="mt-9 text-lg leading-relaxed text-slate-500 lg:text-base">
              O chamado será automaticamente atribuído a um técnico disponível
            </p>

            <button
              type="button"
              className="mt-8 h-14 w-full cursor-pointer rounded-md bg-[#1E2024] text-xl font-medium text-white transition hover:bg-zinc-800 lg:h-12 lg:text-base"
            >
              Criar chamado
            </button>
          </aside>
        </div>
      </div>
    </ClientLayout>
  )
}
