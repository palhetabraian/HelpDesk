import { ArrowLeft } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AdminLayout } from '../../components/layout/admin-layout'

const scheduleGroups = [
  {
    label: 'MANHÃ',
    times: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
  },
  {
    label: 'TARDE',
    times: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  },
  {
    label: 'NOITE',
    times: ['19:00', '20:00', '21:00', '22:00', '23:00'],
  },
] as const

const technicians = [
  {
    id: '1',
    initials: 'CS',
    name: 'Carlos Silva',
    email: 'carlos.silva@test.com',
    availability: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ],
  },
  {
    id: '2',
    initials: 'AO',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@test.com',
    availability: ['13:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '3',
    initials: 'CL',
    name: 'Cíntia Lúcia',
    email: 'cintia.lucia@test.com',
    availability: ['08:00', '09:00', '14:00', '15:00', '18:00'],
  },
  {
    id: '4',
    initials: 'MA',
    name: 'Marcos Alves',
    email: 'marcos.alves@test.com',
    availability: ['07:00', '09:00', '11:00', '15:00'],
  },
]

export function TechnicianProfilePage() {
  const navigate = useNavigate()
  const { technicianId } = useParams()

  const technician = useMemo(
    () => technicians.find((currentTechnician) => currentTechnician.id === technicianId),
    [technicianId],
  )

  const [selectedHours, setSelectedHours] = useState(
    technician?.availability ?? [],
  )

  const isEditingTechnician = Boolean(technicianId)

  function handleToggleHour(hour: string) {
    setSelectedHours((currentHours) => {
      if (currentHours.includes(hour)) {
        return currentHours.filter((currentHour) => currentHour !== hour)
      }

      return [...currentHours, hour]
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AdminLayout>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[620px] md:max-w-[760px] lg:max-w-[820px] lg:pt-6 xl:max-w-[880px]"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          Voltar
        </button>

        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h1 className="text-2xl font-bold text-blue-700">
            Perfil de técnico
          </h1>

          <div className="grid w-full grid-cols-2 gap-2 md:w-auto md:flex">
            <Link
              to="/admin/technicians"
              className="flex h-9 cursor-pointer items-center justify-center rounded-md bg-slate-200 px-4 text-xs font-bold text-slate-900 transition hover:bg-slate-300 md:px-5"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="h-9 cursor-pointer rounded-md bg-zinc-900 px-4 text-xs font-bold text-white transition hover:bg-zinc-800 md:px-5"
            >
              Salvar
            </button>
          </div>
        </div>

        <div className="mt-5 grid items-start gap-5 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <section className="self-start rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Dados pessoais
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Defina as informações do perfil de técnico
            </p>

            {isEditingTechnician && technician && (
              <div className="mt-5 flex size-12 items-center justify-center rounded-full bg-blue-700 text-sm font-bold leading-none text-white">
                {technician.initials}
              </div>
            )}

            <div className="mt-6 grid gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={technician?.name ?? ''}
                  placeholder="Nome completo"
                  className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={technician?.email ?? ''}
                  placeholder="exemplo@mail.com"
                  className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                />
              </div>

              {!isEditingTechnician && (
                <div>
                  <label
                    htmlFor="password"
                    className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Defina a senha de acesso"
                    className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                  />
                  <span className="mt-2 block text-xs italic text-slate-500">
                    Mínimo de 6 dígitos
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="self-start rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Horários de atendimento
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </p>

            <div className="mt-6 grid gap-4">
              {scheduleGroups.map((group) => (
                <div key={group.label}>
                  <strong className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
                    {group.label}
                  </strong>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {group.times.map((time) => {
                      const isSelected = selectedHours.includes(time)

                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleToggleHour(time)}
                          className={[
                            'flex h-7 min-w-12 cursor-pointer items-center justify-center rounded-full border px-3 text-xs font-bold transition',
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                              : 'border-slate-400 bg-white text-slate-900 hover:border-blue-600 hover:text-blue-700',
                          ].join(' ')}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </AdminLayout>
  )
}
