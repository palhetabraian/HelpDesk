import { Link } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'
import { Input } from '../../components/forms/input'
import { Button } from '../../components/ui/button'

export function LoginPage() {
  return (
    <main className="min-h-dvh bg-slate-50 lg:grid lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <div className="auth-hero hidden min-h-screen lg:block" />

      <section className="relative min-h-dvh overflow-hidden bg-slate-50 lg:flex lg:h-screen lg:min-h-0 lg:items-center lg:rounded-l-[2rem] lg:px-20 lg:py-10">
        <div className="auth-hero absolute inset-x-0 top-0 h-24 lg:hidden" />

        <div className="relative mt-10 min-h-[calc(100dvh-2.5rem)] rounded-t-[2rem] bg-slate-50 px-6 pb-12 pt-7 sm:px-10 lg:mt-0 lg:min-h-0 lg:w-full lg:rounded-none lg:bg-transparent lg:p-0">
          <div className="mx-auto flex w-full max-w-[35rem] flex-col">
          <img
            src={logoHelpDesk}
            alt="HelpDesk"
            className="mx-auto mb-8 h-auto w-40 sm:w-44 lg:mb-10 lg:w-56"
          />

          <form className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-7 sm:px-12 sm:py-12">
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-4xl">
              Acesse o portal
            </h1>

            <p className="mt-3 text-base text-slate-600 sm:text-xl">
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
            <h2 className="text-xl font-bold tracking-[-0.03em] text-zinc-900 sm:text-2xl">
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
        </div>
      </section>
    </main>
  )
}
