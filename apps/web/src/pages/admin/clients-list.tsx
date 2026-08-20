import { Pencil, Trash2, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { AdminLayout } from '../../components/layout/admin-layout'

type Client = {
  id: string
  name: string
  email: string
}

const clients: Client[] = [
  {
    id: '1',
    name: 'André Costa',
    email: 'andre.costa@client.com',
  },
  {
    id: '2',
    name: 'Julia Maria',
    email: 'julia.maria@client.com',
  },
  {
    id: '3',
    name: 'Aline Souza',
    email: 'aline.souza@client.com',
  },
  {
    id: '4',
    name: 'Marcelo Andrade',
    email: 'marcelo.andrade@client.com',
  },
  {
    id: '5',
    name: 'Suzane Moura',
    email: 'suzane.moura@client.com',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ClientsListPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)

  function openClientModal(client: Client) {
    setSelectedClient(client)
  }

  function closeClientModal() {
    setSelectedClient(null)
  }

  function openDeleteModal(client: Client) {
    setClientToDelete(client)
  }

  function closeDeleteModal() {
    setClientToDelete(null)
  }

  function handleClientSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleDeleteClient() {
    closeDeleteModal()
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
          Clientes
        </h1>

        <section className="mt-6 hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="w-[45%] px-4 py-3 text-[11px] font-bold text-slate-500">
                  Nome
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                  E-mail
                </th>
                <th className="w-24 px-4 py-3 text-right text-[11px] font-bold text-slate-500">
                  <span className="sr-only">Ação</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="h-[72px] transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-full bg-blue-700 text-sm font-bold leading-none text-white">
                        {getInitials(client.name)}
                      </span>

                      <strong className="text-sm font-bold text-slate-900">
                        {client.name}
                      </strong>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {client.email}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openDeleteModal(client)}
                        aria-label={`Excluir cliente ${client.name}`}
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} strokeWidth={2.2} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openClientModal(client)}
                        aria-label={`Editar cliente ${client.name}`}
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                      >
                        <Pencil size={14} strokeWidth={2.2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white lg:hidden">
          <div className="grid grid-cols-[1fr_1.2fr_72px] items-center border-b border-slate-200 bg-slate-50 px-4 py-4">
            <span className="text-[11px] font-bold text-slate-500">Nome</span>
            <span className="text-[11px] font-bold text-slate-500">
              E-mail
            </span>
            <span className="sr-only">Ação</span>
          </div>

          <div className="divide-y divide-slate-100">
            {clients.map((client) => (
              <article
                key={client.id}
                className="grid min-h-[72px] grid-cols-[1fr_1.2fr_72px] items-center gap-3 px-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold leading-none text-white">
                    {getInitials(client.name)}
                  </span>

                  <strong className="truncate text-sm font-bold text-slate-900">
                    {client.name}
                  </strong>
                </div>

                <span className="truncate text-xs font-medium text-slate-600">
                  {client.email}
                </span>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openDeleteModal(client)}
                    aria-label={`Excluir cliente ${client.name}`}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-red-50 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openClientModal(client)}
                    aria-label={`Editar cliente ${client.name}`}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                  >
                    <Pencil size={14} strokeWidth={2.2} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 py-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="client-modal-title"
              className="w-full max-w-[250px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:max-w-[360px]"
            >
              <div className="flex h-12 items-center justify-between border-b border-slate-100 px-4">
                <h2
                  id="client-modal-title"
                  className="text-xs font-bold text-slate-900"
                >
                  Cliente
                </h2>

                <button
                  type="button"
                  onClick={closeClientModal}
                  aria-label="Fechar modal de cliente"
                  className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={14} strokeWidth={2.2} />
                </button>
              </div>

              <form onSubmit={handleClientSubmit} className="px-4 py-5">
                <div className="flex size-12 items-center justify-center rounded-full bg-blue-700 text-sm font-bold leading-none text-white">
                  {getInitials(selectedClient.name)}
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-600"
                    >
                      Nome
                    </label>
                    <input
                      id="client-name"
                      name="name"
                      type="text"
                      defaultValue={selectedClient.name}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-email"
                      className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-600"
                    >
                      E-mail
                    </label>
                    <input
                      id="client-email"
                      name="email"
                      type="email"
                      defaultValue={selectedClient.email}
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 h-9 w-full cursor-pointer rounded-md bg-zinc-900 text-xs font-bold text-white transition hover:bg-zinc-800"
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}

        {clientToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 py-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-client-modal-title"
              className="w-full max-w-[250px] rounded-lg border border-slate-200 bg-white p-4 shadow-xl sm:max-w-[360px] sm:p-5"
            >
              <h2
                id="delete-client-modal-title"
                className="text-base font-bold text-slate-900"
              >
                Excluir cliente
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Deseja realmente excluir {clientToDelete.name}?
              </p>

              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Ao excluir, todos os chamados deste cliente serão removidos e
                esta ação não poderá ser desfeita.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="h-9 cursor-pointer rounded-md bg-slate-200 text-xs font-bold text-slate-900 transition hover:bg-slate-300"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleDeleteClient}
                  className="h-9 cursor-pointer rounded-md bg-red-600 text-xs font-bold text-white transition hover:bg-red-700"
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
