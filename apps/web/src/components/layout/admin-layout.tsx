import type { ReactNode } from 'react'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'

type AdminLayoutProps = {
  children: ReactNode
}

const navigationItems = ['Chamados', 'Técnicos', 'Clientes', 'Serviços']

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-zinc-950 px-5 py-6 lg:flex lg:min-h-dvh lg:flex-col">
        <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-40" />

        <nav className="mt-10 flex flex-col gap-2">
          {navigationItems.map((item) => (
            <button
              key={item}
              type="button"
              className="cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white first:bg-blue-700 first:text-white"
            >
              {item}
            </button>
          ))}
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
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-white"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          <img src={logoHelpDesk} alt="HelpDesk" className="h-auto w-36" />

          <div className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            UA
          </div>
        </header>

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
