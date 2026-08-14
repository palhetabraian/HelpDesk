import { ArrowLeft, CheckCircle, Clock } from 'lucide-react'

import { AdminLayout } from '../../components/layout/admin-layout'

export function TicketDetailsPage() {
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
      </div>
    </AdminLayout>
  )
}
