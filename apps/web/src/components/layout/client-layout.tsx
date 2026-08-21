import { ClipboardList, Menu, Plus, X, type LucideIcon } from 'lucide-react'
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

function CreateTicketAction() {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
    >
      <Plus size={18} strokeWidth={2.2} />
      Criar chamado
    </button>
  )
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function openMobileMenu() {
    setIsMobileMenuOpen(true)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
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

        <div className="mt-auto flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UC
          </div>

          <div className="min-w-0">
            <strong className="block truncate text-sm text-white">
              Usuário Cliente
            </strong>
            <span className="block truncate text-xs font-medium text-slate-400">
              user.client@test.com
            </span>
          </div>
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

          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UC
          </div>
        </header>

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

                <CreateTicketAction />
              </nav>

              <div className="mt-auto flex items-center gap-3 border-t border-slate-800 pt-5">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  UC
                </div>

                <div className="min-w-0">
                  <strong className="block truncate text-sm text-white">
                    Usuário Cliente
                  </strong>
                  <span className="block truncate text-xs font-medium text-slate-400">
                    user.client@test.com
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 rounded-t-2xl bg-slate-50 px-5 py-6 sm:px-8 lg:rounded-none lg:bg-transparent lg:px-12 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
