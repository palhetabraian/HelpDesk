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
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white lg:hidden">
          <div className="grid grid-cols-[1fr_1.2fr] items-center border-b border-slate-200 bg-slate-50 px-4 py-4">
            <span className="text-[11px] font-bold text-slate-500">Nome</span>
            <span className="text-[11px] font-bold text-slate-500">
              E-mail
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {clients.map((client) => (
              <article
                key={client.id}
                className="grid min-h-[72px] grid-cols-[1fr_1.2fr] items-center gap-3 px-4 py-4"
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
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
