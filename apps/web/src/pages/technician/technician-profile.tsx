import { ArrowLeft, Trash2, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TechnicianLayout } from '../../components/layout/technician-layout'

const technicianProfile = {
  initials: 'CS',
  name: 'Carlos Silva',
  email: 'carlos.silva@test.com',
  availability: ['09:00', '10:00', '12:00', '13:00', '15:00', '16:00'],
}

function TechnicianProfileBackground() {
  return (
    <div className="w-full max-w-[1110px] opacity-40">
      <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
        Meus chamados
      </h1>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="min-h-[210px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="text-base font-bold text-slate-400">00003</span>

            <div className="mt-4">
              <h2 className="text-xl font-bold leading-tight text-[#1E2024]">
                Rede lenta
              </h2>
              <p className="mt-1 text-base leading-tight text-[#1E2024]">
                Instalação de Rede
              </p>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                  AC
                </span>
                <span className="text-base font-bold text-[#1E2024]">
                  André Costa
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function TechnicianProfilePage() {
  const navigate = useNavigate()
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false)

  function closeProfile() {
    navigate('/technician/tickets')
  }

  function openChangePasswordModal() {
    setIsChangePasswordModalOpen(true)
  }

  function closeChangePasswordModal() {
    setIsChangePasswordModalOpen(false)
  }

  return (
    <TechnicianLayout>
      <div className="relative min-h-[calc(100dvh-128px)]">
        <TechnicianProfileBackground />

        <div className="fixed inset-0 z-40 flex items-start justify-center bg-zinc-950/50 px-4 py-28 lg:left-[200px] lg:items-center lg:py-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="technician-profile-title"
            className="w-full max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-[470px]"
          >
            <header className="flex h-16 items-center justify-between border-b border-slate-200 px-6 sm:h-20 sm:px-8">
              <h1
                id="technician-profile-title"
                className="text-xl font-bold text-[#1E2024]"
              >
                Perfil
              </h1>

              <button
                type="button"
                onClick={closeProfile}
                aria-label="Fechar perfil"
                className="flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={22} strokeWidth={2.2} />
              </button>
            </header>

            <form>
              <div className="px-6 py-7 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-blue-700 text-base font-bold text-white sm:size-16">
                    {technicianProfile.initials}
                  </div>

                  <button
                    type="button"
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-4 text-sm font-bold text-[#1E2024] transition hover:bg-slate-300"
                  >
                    <Upload size={18} strokeWidth={2.2} />
                    Nova imagem
                  </button>

                  <button
                    type="button"
                    aria-label="Remover imagem"
                    className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} strokeWidth={2.2} />
                  </button>
                </div>

                <div className="mt-8 grid gap-6">
                  <div>
                    <label
                      htmlFor="technician-name"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      Nome
                    </label>
                    <input
                      id="technician-name"
                      name="name"
                      type="text"
                      defaultValue={technicianProfile.name}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none transition focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="technician-email"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      E-mail
                    </label>
                    <input
                      id="technician-email"
                      name="email"
                      type="email"
                      defaultValue={technicianProfile.email}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none transition focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="technician-password"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      Senha
                    </label>

                    <div className="mt-2 flex items-center gap-3 border-b border-slate-200 pb-3">
                      <input
                        id="technician-password"
                        name="password"
                        type="password"
                        value="12345678"
                        readOnly
                        className="w-full border-0 bg-transparent text-lg text-[#1E2024] outline-none"
                      />

                      <button
                        type="button"
                        onClick={openChangePasswordModal}
                        className="h-9 cursor-pointer rounded-md bg-slate-200 px-4 text-sm font-bold text-[#1E2024] transition hover:bg-slate-300"
                      >
                        Alterar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-y border-slate-200 px-6 py-7 sm:px-8">
                <h2 className="text-lg font-bold text-[#1E2024]">
                  Disponibilidade
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Horários de atendimento definidos pelo admin
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {technicianProfile.availability.map((hour) => (
                    <span
                      key={hour}
                      className="flex h-9 min-w-16 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-400"
                    >
                      {hour}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-5 sm:px-8">
                <button
                  type="button"
                  className="h-12 w-full cursor-pointer rounded-md bg-[#1E2024] text-base font-medium text-white transition hover:bg-zinc-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </section>

          {isChangePasswordModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 py-6 lg:left-[200px]">
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="change-password-title"
                className="flex h-auto max-h-[calc(100dvh-32px)] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-[470px] lg:max-w-[650px]"
              >
                <header className="flex h-20 items-center justify-between border-b border-slate-200 px-7 sm:px-9">
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      onClick={closeChangePasswordModal}
                      aria-label="Voltar para perfil"
                      className="flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <ArrowLeft size={26} strokeWidth={2.1} />
                    </button>

                    <h2
                      id="change-password-title"
                      className="text-[26px] font-bold text-[#1E2024] sm:text-[30px]"
                    >
                      Alterar senha
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={closeChangePasswordModal}
                    aria-label="Fechar alteração de senha"
                    className="flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X size={28} strokeWidth={2.1} />
                  </button>
                </header>

                <form>
                  <div className="grid gap-8 px-7 py-9 sm:px-9 sm:py-10">
                    <div>
                      <label
                        htmlFor="current-password"
                        className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600"
                      >
                        Senha atual
                      </label>

                      <input
                        id="current-password"
                        name="currentPassword"
                        type="password"
                        placeholder="Digite sua senha atual"
                        className="mt-5 w-full border-0 border-b border-slate-200 bg-transparent pb-4 text-[26px] text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700 sm:text-[30px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600"
                      >
                        Nova senha
                      </label>

                      <input
                        id="new-password"
                        name="newPassword"
                        type="password"
                        placeholder="Digite sua nova senha"
                        className="mt-5 w-full border-0 border-b border-slate-200 bg-transparent pb-4 text-[26px] text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700 sm:text-[30px]"
                      />

                      <p className="mt-4 text-xl italic text-slate-400">
                        Mínimo de 6 dígitos
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 px-7 py-6 sm:px-9">
                    <button
                      type="button"
                      className="h-16 w-full cursor-pointer rounded-md bg-[#1E2024] text-2xl font-medium text-white transition hover:bg-zinc-800"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </TechnicianLayout>
  )
}
