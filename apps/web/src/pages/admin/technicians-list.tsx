import { Pencil, Plus } from 'lucide-react'

import { AdminLayout } from '../../components/layout/admin-layout'

type Technician = {
  id: string
  name: string
  email: string
  availability: string[]
}

const technicians: Technician[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    email: 'carlos.silva@test.com',
    availability: ['08:00', '09:00', '10:00', '11:00', '+4'],
  },
  {
    id: '2',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@test.com',
    availability: ['13:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '3',
    name: 'Cíntia Lúcia',
    email: 'cintia.lucia@test.com',
    availability: ['08:00', '09:00', '14:00', '15:00', '18:00'],
  },
  {
    id: '4',
    name: 'Marcos Alves',
    email: 'marcos.alves@test.com',
    availability: ['07:00', '09:00', '11:00', '15:00', '+3'],
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

export function TechniciansListPage() {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-blue-700">Técnicos</h1>

          <button
            type="button"
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 lg:px-5"
          >
            <Plus size={16} strokeWidth={2.4} />
            <span className="hidden lg:inline">Novo</span>
          </button>
        </div>

        <section className="mt-6 hidden overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                  Nome
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                  E-mail
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                  Disponibilidade
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {technicians.map((technician) => (
                <tr
                  key={technician.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                        {getInitials(technician.name)}
                      </span>

                      <strong className="text-sm font-bold text-slate-900">
                        {technician.name}
                      </strong>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {technician.email}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {technician.availability.map((time) => (
                        <span
                          key={time}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Editar técnico ${technician.name}`}
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

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white lg:hidden">
          <div className="grid grid-cols-[1fr_1fr_40px] border-b border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-[11px] font-bold text-slate-500">Nome</span>
            <span className="text-[11px] font-bold text-slate-500">
              Disponibilidade
            </span>
            <span className="sr-only">Ação</span>
          </div>

          <div className="divide-y divide-slate-100">
            {technicians.map((technician) => {
              const [firstAvailability, ...remainingAvailability] =
                technician.availability

              return (
                <article
                  key={technician.id}
                  className="grid grid-cols-[1fr_1fr_40px] items-center gap-3 px-4 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                      {getInitials(technician.name)}
                    </span>

                    <strong className="truncate text-sm font-bold text-slate-900">
                      {technician.name}
                    </strong>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                      {firstAvailability}
                    </span>

                    {remainingAvailability.length > 0 && (
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                        +{remainingAvailability.length}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    aria-label={`Editar técnico ${technician.name}`}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                  >
                    <Pencil size={14} strokeWidth={2.2} />
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
