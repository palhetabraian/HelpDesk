import {
  ClipboardList,
  LogOut,
  Menu,
  User,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'

type TechnicianLayoutProps = {
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
    href: '/technician/tickets',
  },
]

function UserOptionsMenu() {
  return (
    <div className="rounded-md border border-slate-800 bg-zinc-950 p-4 shadow-xl">
      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">
        Opções
      </span>

      <div className="mt-4 grid gap-3">
        <Link
          to="/technician/profile"
          className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <User size={17} strokeWidth={2.2} />
          Perfil
        </Link>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 text-sm font-medium text-red-500 transition hover:text-red-400"
        >
          <LogOut size={17} strokeWidth={2.2} />
          Sair
        </button>
      </div>
    </div>
  )
}

export function TechnicianLayout({ children }: TechnicianLayoutProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleUserMenu() {
    setIsUserMenuOpen((currentState) => !currentState)
  }

  function openMobileMenu() {
    setIsMobileMenuOpen(true)
    setIsUserMenuOpen(false)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden w-[200px] shrink-0 border-r border-slate-800 bg-zinc-950 px-6 py-8 lg:flex lg:min-h-dvh lg:flex-col">
        <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-32" />

        <nav className="mt-12 flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  [
                    'flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-xs font-medium transition hover:bg-slate-900 hover:text-white',
                    isActive ? 'bg-blue-700 text-white' : 'text-slate-400',
                  ].join(' ')
                }
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="relative mt-auto border-t border-slate-800 pt-5">
          {isUserMenuOpen && (
            <div className="absolute bottom-[72px] left-0 z-50 w-[166px]">
              <UserOptionsMenu />
            </div>
          )}

          <button
            type="button"
            onClick={toggleUserMenu}
            className="flex w-full cursor-pointer items-center gap-3 rounded-md text-left transition hover:bg-slate-900/70"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              UT
            </div>

            <div className="min-w-0">
              <strong className="block truncate text-xs text-white">
                Usuário Técnico
              </strong>
              <span className="block truncate text-xs font-medium text-slate-400">
                user.tech@test.com
              </span>
            </div>
          </button>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="relative flex h-20 items-center justify-between bg-zinc-950 px-5 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={openMobileMenu}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-36" />

          <button
            type="button"
            onClick={toggleUserMenu}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
            aria-label="Abrir opções do usuário"
          >
            UT
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-5 top-16 z-50 w-[166px]">
              <UserOptionsMenu />
            </div>
          )}
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
              </nav>

              <div className="mt-auto border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={toggleUserMenu}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-md text-left transition hover:bg-slate-900/70"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    UT
                  </div>

                  <div className="min-w-0">
                    <strong className="block truncate text-xs text-white">
                      Usuário Técnico
                    </strong>
                    <span className="block truncate text-xs font-medium text-slate-400">
                      user.tech@test.com
                    </span>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="mt-4">
                    <UserOptionsMenu />
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
