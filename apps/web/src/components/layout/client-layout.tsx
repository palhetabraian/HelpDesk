import {
  ArrowLeft,
  ClipboardList,
  LogOut,
  Menu,
  Plus,
  Trash2,
  Upload,
  UserCircle,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'

type ClientLayoutProps = {
  children: ReactNode
}

type NavigationItem = {
  label: string
  icon: LucideIcon
  href: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Meus chamados',
    icon: ClipboardList,
    href: '/client/tickets',
  },
]

const clientProfile = {
  initials: 'UC',
  name: 'André Costa',
  email: 'andre.costa@client.com',
}

type CreateTicketActionProps = {
  onClick?: () => void
}

function CreateTicketAction({ onClick }: CreateTicketActionProps) {
  return (
    <NavLink
      to="/client/tickets/new"
      onClick={onClick}
      className={({ isActive }) =>
        [
          'flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-900 hover:text-white',
          isActive ? 'bg-blue-700 text-white' : 'text-slate-400',
        ].join(' ')
      }
    >
      <Plus size={18} strokeWidth={2.2} />
      Criar chamado
    </NavLink>
  )
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false)

  function openMobileMenu() {
    setIsMobileMenuOpen(true)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  function toggleUserOptions() {
    setIsUserOptionsOpen((state) => !state)
  }

  function closeUserOptions() {
    setIsUserOptionsOpen(false)
  }

  function openProfileModal() {
    setIsProfileModalOpen(true)
    setIsUserOptionsOpen(false)
  }

  function closeProfileModal() {
    setIsProfileModalOpen(false)
  }

  function openChangePasswordModal() {
    setIsChangePasswordModalOpen(true)
  }

  function closeChangePasswordModal() {
    setIsChangePasswordModalOpen(false)
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-slate-900 lg:flex lg:bg-slate-50">
      <aside className="hidden w-[200px] shrink-0 border-r border-slate-800 bg-zinc-950 px-6 py-8 lg:flex lg:min-h-dvh lg:flex-col">
        <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-36" />

        <nav className="mt-12 flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  [
                    'flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-900 hover:text-white',
                    isActive ? 'bg-blue-700 text-white' : 'text-slate-400',
                  ].join(' ')
                }
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
              </NavLink>
            )
          })}

          <CreateTicketAction />
        </nav>

        <div className="relative mt-auto border-t border-slate-800 pt-5">
          <button
            type="button"
            onClick={toggleUserOptions}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg text-left transition hover:bg-slate-900"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
              {clientProfile.initials}
            </div>

            <div className="min-w-0">
              <strong className="block truncate text-sm text-white">
                Usuário Cliente
              </strong>
              <span className="block truncate text-xs font-medium text-slate-400">
                user.client@test.com
              </span>
            </div>
          </button>

          {isUserOptionsOpen && (
            <div className="absolute bottom-[calc(100%+16px)] left-0 z-30 w-[180px] rounded-lg border border-slate-800 bg-zinc-950 p-5 shadow-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                Opções
              </span>

              <div className="mt-5 grid gap-5">
                <button
                  type="button"
                  onClick={openProfileModal}
                  className="flex cursor-pointer items-center gap-3 text-left text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  <UserCircle size={20} strokeWidth={2.1} />
                  Perfil
                </button>

                <button
                  type="button"
                  onClick={closeUserOptions}
                  className="flex cursor-pointer items-center gap-3 text-left text-sm font-medium text-red-500 transition hover:text-red-400"
                >
                  <LogOut size={20} strokeWidth={2.1} />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="flex h-[116px] items-start justify-between bg-zinc-950 px-6 pt-7 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={openMobileMenu}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-32" />

          <button
            type="button"
            onClick={toggleUserOptions}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
          >
            {clientProfile.initials}
          </button>
        </header>

        {isUserOptionsOpen && (
          <div className="fixed inset-x-6 top-24 z-40 rounded-lg border border-slate-800 bg-zinc-950 p-5 shadow-2xl lg:hidden">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
              Opções
            </span>

            <div className="mt-5 grid gap-5">
              <button
                type="button"
                onClick={openProfileModal}
                className="flex cursor-pointer items-center gap-3 text-left text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <UserCircle size={20} strokeWidth={2.1} />
                Perfil
              </button>

              <button
                type="button"
                onClick={closeUserOptions}
                className="flex cursor-pointer items-center gap-3 text-left text-sm font-medium text-red-500 transition hover:text-red-400"
              >
                <LogOut size={20} strokeWidth={2.1} />
                Sair
              </button>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={closeMobileMenu}
              className="absolute inset-0 cursor-pointer bg-zinc-950/50"
            />

            <aside className="relative z-10 flex h-dvh w-[280px] max-w-[82vw] flex-col border-r border-slate-800 bg-zinc-950 px-5 py-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <img
                  src={logoHelpDesk}
                  alt="HelpDesk"
                  className="h-auto w-36"
                />

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Fechar menu"
                  className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white transition hover:bg-slate-800"
                >
                  <X size={20} strokeWidth={2.2} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        [
                          'flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-900 hover:text-white',
                          isActive
                            ? 'bg-blue-700 text-white'
                            : 'text-slate-400',
                        ].join(' ')
                      }
                    >
                      <Icon size={18} strokeWidth={2.2} />
                      {item.label}
                    </NavLink>
                  )
                })}

                <CreateTicketAction onClick={closeMobileMenu} />
              </nav>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu()
                  openProfileModal()
                }}
                className="mt-auto flex cursor-pointer items-center gap-3 border-t border-slate-800 pt-5 text-left"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  {clientProfile.initials}
                </div>

                <div className="min-w-0">
                  <strong className="block truncate text-sm text-white">
                    Usuário Cliente
                  </strong>
                  <span className="block truncate text-xs font-medium text-slate-400">
                    user.client@test.com
                  </span>
                </div>
              </button>
            </aside>
          </div>
        )}

        <main className="flex-1 rounded-t-2xl bg-slate-50 px-5 py-6 sm:px-8 lg:rounded-none lg:bg-transparent lg:px-12 lg:py-12">
          {children}
        </main>
      </div>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/50 px-4 py-40 lg:left-[200px] lg:items-center lg:py-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-profile-title"
            className="w-full max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-[440px]"
          >
            <header className="flex h-16 items-center justify-between border-b border-slate-200 px-7">
              <h2
                id="client-profile-title"
                className="text-xl font-bold text-[#1E2024]"
              >
                Perfil
              </h2>

              <button
                type="button"
                onClick={closeProfileModal}
                aria-label="Fechar perfil"
                className="flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={22} strokeWidth={2.1} />
              </button>
            </header>

            <form>
              <div className="px-7 py-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-16 items-center justify-center rounded-full bg-blue-700 text-base font-bold text-white">
                    {clientProfile.initials}
                  </div>

                  <button
                    type="button"
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-4 text-sm font-bold text-[#1E2024] transition hover:bg-slate-300"
                  >
                    <Upload size={17} strokeWidth={2.2} />
                    Nova imagem
                  </button>

                  <button
                    type="button"
                    aria-label="Remover imagem"
                    className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} strokeWidth={2.2} />
                  </button>
                </div>

                <div className="mt-8 grid gap-6">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      Nome
                    </label>
                    <input
                      id="client-name"
                      name="name"
                      type="text"
                      defaultValue={clientProfile.name}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none transition focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-email"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      E-mail
                    </label>
                    <input
                      id="client-email"
                      name="email"
                      type="email"
                      defaultValue={clientProfile.email}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none transition focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-password"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                    >
                      Senha
                    </label>

                    <div className="mt-2 flex items-center gap-3 border-b border-slate-200 pb-3">
                      <input
                        id="client-password"
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

              <div className="border-t border-slate-200 px-7 py-6">
                <button
                  type="button"
                  className="h-12 w-full cursor-pointer rounded-md bg-[#1E2024] text-base font-medium text-white transition hover:bg-zinc-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-zinc-950/50 px-4 py-48 lg:left-[200px] lg:items-center lg:py-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-change-password-title"
            className="w-full max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-[440px]"
          >
            <header className="flex h-16 items-center justify-between border-b border-slate-200 px-7">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={closeChangePasswordModal}
                  aria-label="Voltar para perfil"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <ArrowLeft size={22} strokeWidth={2.1} />
                </button>

                <h2
                  id="client-change-password-title"
                  className="text-xl font-bold text-[#1E2024]"
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
                <X size={22} strokeWidth={2.1} />
              </button>
            </header>

            <form>
              <div className="grid gap-7 px-7 py-9">
                <div>
                  <label
                    htmlFor="client-current-password"
                    className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                  >
                    Senha atual
                  </label>

                  <input
                    id="client-current-password"
                    name="currentPassword"
                    type="password"
                    placeholder="Digite sua senha atual"
                    className="mt-3 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client-new-password"
                    className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                  >
                    Nova senha
                  </label>

                  <input
                    id="client-new-password"
                    name="newPassword"
                    type="password"
                    placeholder="Digite sua nova senha"
                    className="mt-3 w-full border-0 border-b border-slate-200 bg-transparent pb-3 text-lg text-[#1E2024] outline-none placeholder:text-slate-400 focus:border-blue-700"
                  />

                  <p className="mt-3 text-sm italic text-slate-400">
                    Mínimo de 6 dígitos
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 px-7 py-6">
                <button
                  type="button"
                  className="h-12 w-full cursor-pointer rounded-md bg-[#1E2024] text-base font-medium text-white transition hover:bg-zinc-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}
