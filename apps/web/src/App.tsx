import { env } from './configs/env'

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="text-sm font-medium text-blue-600">
          HelpDesk Web
        </span>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Frontend iniciado
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          A base do React com Vite e TailwindCSS está pronta. A partir daqui,
          vamos construir as telas por persona seguindo o Figma e consumindo a
          API do backend.
        </p>

        <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
          API configurada: {env.apiUrl}
        </p>
      </section>
    </main>
  )
}

export default App
