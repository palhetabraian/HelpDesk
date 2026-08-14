import { env } from '../../configs/env'

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="text-sm font-medium text-blue-600">
          HelpDesk Web
        </span>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Esta será a tela de entrada da aplicação. Na próxima etapa vamos
          montar o formulário seguindo o layout do Figma.
        </p>

        <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
          API configurada: {env.apiUrl}
        </p>
      </section>
    </main>
  )
}
