import { AdminLayout } from '../../components/layout/admin-layout'

export function TicketsListPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-blue-700">Chamados</h1>

        <p className="mt-2 text-sm text-slate-600">
          Lista de chamados do sistema.
        </p>
      </div>
    </AdminLayout>
  )
}
