import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <span className="text-sm font-medium text-blue-600">
          Erro 404
        </span>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Página não encontrada
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          A rota acessada não existe no frontend do HelpDesk.
        </p>

        <Link
          to="/"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Voltar para o login
        </Link>
      </section>
    </main>
  )
}
