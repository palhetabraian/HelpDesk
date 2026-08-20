import { ClipboardList, Menu, User, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

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
  {
    label: 'Perfil',
    icon: User,
    href: '/technician/profile',
  },
]

export function TechnicianLayout({ children }: TechnicianLayoutProps) {
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

        <div className="mt-auto flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
            UT
          </div>

          <div>
            <strong className="block text-xs text-white">
              Usuário Técnico
            </strong>
            <span className="text-xs font-medium text-slate-400">
              user.tech@test.com
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="flex h-20 items-center justify-between bg-zinc-950 px-5 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-36" />

          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UT
          </div>
        </header>

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
