import { Link } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'
import { Input } from '../../components/forms/input'
import { Button } from '../../components/ui/button'

export function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <div className="auth-hero hidden min-h-screen lg:block" />

      <section className="relative min-h-screen overflow-hidden rounded-t-[2rem] bg-slate-50 px-6 pb-16 pt-20 sm:px-10 lg:flex lg:h-screen lg:min-h-0 lg:items-center lg:rounded-l-[2rem] lg:rounded-t-none lg:px-20 lg:py-10">
        <div className="auth-hero absolute inset-x-0 top-0 h-24 rounded-b-[2rem] lg:hidden" />

        <div className="relative mx-auto flex w-full max-w-[35rem] flex-col">
          <img
            src={logoHelpDesk}
            alt="HelpDesk"
            className="mx-auto mb-16 h-auto w-56 lg:mb-10"
          />

          <form className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-12 sm:py-12">
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900">
              Acesse o portal
            </h1>

            <p className="mt-3 text-xl text-slate-600">
              Entre usando seu e-mail e senha cadastrados
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <Input
                label="E-mail"
                name="email"
                type="email"
                placeholder="exemplo@mail.com"
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>

            <Button type="submit" className="mt-10 w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-12">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-zinc-900">
              Ainda não tem uma conta?
            </h2>

            <p className="mt-2 text-base text-slate-600">
              Cadastre agora mesmo
            </p>

            <Link
              to="/register"
              className="mt-8 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-200 px-4 text-base font-semibold text-zinc-900 transition hover:bg-zinc-300 focus:ring-2 focus:ring-zinc-100 focus:outline-none"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
