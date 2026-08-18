import { ArrowLeft, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

const defaultCommercialHours = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

export function TechnicianProfilePage() {
  const navigate = useNavigate()
  const [selectedHours, setSelectedHours] = useState(defaultCommercialHours)

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
        className="mx-auto w-full max-w-[920px] lg:pt-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
          Voltar
        </button>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="text-3xl font-bold text-blue-700 lg:text-4xl">
            Perfil de técnico
          </h1>

          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-4">
            <Link
              to="/admin/technicians"
              className="flex h-14 cursor-pointer items-center justify-center rounded-lg bg-slate-200 px-8 text-lg font-bold text-slate-900 transition hover:bg-slate-300 lg:h-12 lg:text-base"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="h-14 cursor-pointer rounded-lg bg-zinc-900 px-8 text-lg font-bold text-white transition hover:bg-zinc-800 lg:h-12 lg:text-base"
            >
              Salvar
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Dados pessoais
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-500">
              Defina as informações do perfil de técnico
            </p>

            <div className="mt-8 grid gap-7">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome completo"
                  className="mt-4 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-2xl text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@mail.com"
                  className="mt-4 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-2xl text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Defina a senha de acesso"
                  className="mt-4 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-2xl text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                />
                <span className="mt-3 block text-base italic text-slate-500">
                  Mínimo de 6 dígitos
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Horários de atendimento
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-500">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </p>

            <div className="mt-8 grid gap-7">
              {scheduleGroups.map((group) => (
                <div key={group.label}>
                  <strong className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600">
                    {group.label}
                  </strong>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {group.times.map((time) => {
                      const isSelected = selectedHours.includes(time)

                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleToggleHour(time)}
                          className={[
                            'flex h-10 cursor-pointer items-center gap-2 rounded-full border px-5 text-base font-bold transition',
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                              : 'border-slate-400 bg-white text-slate-900 hover:border-blue-600 hover:text-blue-700',
                          ].join(' ')}
                        >
                          {time}
                          {isSelected && <X size={16} strokeWidth={2.2} />}
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
