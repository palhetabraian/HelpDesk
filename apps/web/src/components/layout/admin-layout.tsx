import {
  ClipboardList,
  Menu,
  UserCog,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'

type AdminLayoutProps = {
  children: ReactNode
}

type NavigationItem = {
  label: string
  icon: LucideIcon
  href: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Chamados',
    icon: ClipboardList,
    href: '/admin/tickets',
  },
  {
    label: 'Técnicos',
    icon: UserCog,
    href: '/admin/technicians',
  },
  {
    label: 'Clientes',
    icon: Users,
    href: '/admin/clients',
  },
  {
    label: 'Serviços',
    icon: Wrench,
    href: '/admin/services',
  },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function openMobileMenu() {
    setIsMobileMenuOpen(true)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-zinc-950 px-5 py-6 lg:flex lg:min-h-dvh lg:flex-col">
        <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-40" />

        <nav className="mt-10 flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  [
                    'flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-900 hover:text-white',
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

        <div className="mt-auto flex items-center gap-3 rounded-xl bg-slate-900 p-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UA
          </div>

          <div>
            <strong className="block text-sm text-white">Usuário Admin</strong>
            <span className="text-xs font-medium text-slate-400">ADMIN</span>
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="flex h-20 items-center justify-between bg-zinc-950 px-5 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={openMobileMenu}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-36" />

          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UA
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
                          'flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-900 hover:text-white',
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

              <div className="mt-auto flex items-center gap-3 rounded-xl bg-slate-900 p-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                  UA
                </div>

                <div className="min-w-0">
                  <strong className="block truncate text-sm text-white">
                    Usuário Admin
                  </strong>
                  <span className="block truncate text-xs font-medium text-slate-400">
                    ADMIN
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
