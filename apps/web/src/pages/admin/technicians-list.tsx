import { Pencil, Plus, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

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
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false)
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null)

  const isEditingTechnician = selectedTechnician !== null

  function openEditModal(technician: Technician) {
    setSelectedTechnician(technician)
    setIsTechnicianModalOpen(true)
  }

  function closeTechnicianModal() {
    setIsTechnicianModalOpen(false)
    setSelectedTechnician(null)
  }

  function handleTechnicianSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
            Técnicos
          </h1>

          <Link
            to="/admin/technicians/new"
            aria-label="Cadastrar novo técnico"
            className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-zinc-900 text-white transition hover:bg-zinc-800 lg:h-10 lg:w-auto lg:gap-2 lg:px-5 lg:text-sm lg:font-semibold"
          >
            <Plus size={18} strokeWidth={2.4} />
            <span className="hidden lg:inline">Novo</span>
          </Link>
        </div>

        <section className="mt-6 hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="w-[36%] px-4 py-3 text-[11px] font-bold text-slate-500">
                  Nome
                </th>
                <th className="w-[30%] px-4 py-3 text-[11px] font-bold text-slate-500">
                  E-mail
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                  Disponibilidade
                </th>
                <th className="w-16 px-4 py-3 text-right text-[11px] font-bold text-slate-500">
                  <span className="sr-only">Ação</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {technicians.map((technician) => (
                <tr
                  key={technician.id}
                  className="h-[72px] transition hover:bg-slate-50"
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
                          className="flex h-7 items-center rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-500"
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
                      onClick={() => openEditModal(technician)}
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
          <div className="grid grid-cols-[1fr_126px_36px] items-center border-b border-slate-200 bg-slate-50 px-4 py-4">
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
                  className="grid min-h-[72px] grid-cols-[1fr_126px_36px] items-center gap-3 px-4 py-4"
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
                    <span className="flex h-7 items-center rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-500">
                      {firstAvailability}
                    </span>

                    {remainingAvailability.length > 0 && (
                      <span className="flex h-7 items-center rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-500">
                        +{remainingAvailability.length}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    aria-label={`Editar técnico ${technician.name}`}
                    onClick={() => openEditModal(technician)}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                  >
                    <Pencil size={14} strokeWidth={2.2} />
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        {isTechnicianModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="technician-modal-title"
              className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="technician-modal-title"
                    className="text-lg font-bold text-slate-950"
                  >
                    {isEditingTechnician ? 'Editar técnico' : 'Novo técnico'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {isEditingTechnician
                      ? 'Atualize as informações básicas do técnico.'
                      : 'Cadastre as informações básicas do técnico.'}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Fechar modal de técnico"
                  onClick={closeTechnicianModal}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              <form onSubmit={handleTechnicianSubmit} className="mt-6">
                <div className="grid gap-4">
                  <div>
                    <label
                      htmlFor="technician-name"
                      className="text-xs font-bold text-slate-500"
                    >
                      Nome
                    </label>
                    <input
                      id="technician-name"
                      name="name"
                      type="text"
                      defaultValue={selectedTechnician?.name ?? ''}
                      placeholder="Digite o nome completo"
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="technician-email"
                      className="text-xs font-bold text-slate-500"
                    >
                      E-mail
                    </label>
                    <input
                      id="technician-email"
                      name="email"
                      type="email"
                      defaultValue={selectedTechnician?.email ?? ''}
                      placeholder="exemplo@mail.com"
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="technician-password"
                      className="text-xs font-bold text-slate-500"
                    >
                      Senha
                    </label>
                    <input
                      id="technician-password"
                      name="password"
                      type="password"
                      placeholder={
                        isEditingTechnician
                          ? 'Deixe em branco para manter a senha'
                          : 'Digite uma senha'
                      }
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="technician-availability"
                      className="text-xs font-bold text-slate-500"
                    >
                      Disponibilidade
                    </label>
                    <input
                      id="technician-availability"
                      name="availability"
                      type="text"
                      defaultValue={selectedTechnician?.availability.join(', ') ?? ''}
                      placeholder="Ex: 08:00, 09:00, 10:00"
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                    <span className="mt-2 block text-xs text-slate-500">
                      Separe os horários por vírgula.
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeTechnicianModal}
                    className="h-10 cursor-pointer rounded-md bg-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="h-10 cursor-pointer rounded-md bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    {isEditingTechnician ? 'Salvar alterações' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
