import { Link } from 'react-router-dom'

import logoHelpDesk from '../../assets/Logo-HelpDesk.svg'
import { Input } from '../../components/forms/input'
import { Button } from '../../components/ui/button'

export function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <div className="auth-hero hidden min-h-screen lg:block" />

      <section className="relative min-h-screen overflow-hidden rounded-t-[2rem] bg-slate-50 px-6 pb-16 pt-20 sm:px-10 lg:min-h-screen lg:overflow-y-auto lg:rounded-l-[2rem] lg:rounded-t-none lg:px-24 lg:py-28">
        <div className="auth-hero absolute inset-x-0 top-0 h-24 rounded-b-[2rem] lg:hidden" />

        <div className="relative mx-auto flex w-full max-w-[35rem] flex-col">
          <img
            src={logoHelpDesk}
            alt="HelpDesk"
            className="mx-auto mb-16 h-auto w-56 lg:mb-24"
          />

          <form className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-12 sm:py-12">
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-zinc-900">
              Crie sua conta
            </h1>

            <p className="mt-3 text-xl text-slate-600">
              Informe seu nome, e-mail e senha
            </p>

            <div className="mt-14 flex flex-col gap-9">
              <Input
                label="Nome"
                name="name"
                placeholder="Digite o nome completo"
              />

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
                helperText="Mínimo de 6 dígitos"
              />
            </div>

            <Button type="submit" className="mt-14 w-full">
              Cadastrar
            </Button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-12">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-zinc-900">
              Já tem uma conta?
            </h2>

            <p className="mt-2 text-base text-slate-600">Entre agora mesmo</p>

            <Link
              to="/"
              className="mt-8 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-200 px-4 text-base font-semibold text-zinc-900 transition hover:bg-zinc-300 focus:ring-2 focus:ring-zinc-100 focus:outline-none"
            >
              Acessar conta
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
