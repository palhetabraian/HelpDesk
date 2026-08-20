import { Ban, CircleCheck, Pencil, Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { AdminLayout } from '../../components/layout/admin-layout'

type Service = {
  id: string
  title: string
  price: string
  isActive: boolean
}

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Instalação de Rede',
    price: 'R$ 180,00',
    isActive: true,
  },
  {
    id: '2',
    title: 'Recuperação de Dados',
    price: 'R$ 200,00',
    isActive: false,
  },
  {
    id: '3',
    title: 'Manutenção de Hardware',
    price: 'R$ 150,00',
    isActive: true,
  },
  {
    id: '4',
    title: 'Suporte de Software',
    price: 'R$ 200,00',
    isActive: true,
  },
]

function getStatusClasses(isActive: boolean) {
  if (isActive) {
    return 'bg-green-100 text-green-700'
  }

  return 'bg-red-100 text-red-600'
}

export function ServicesListPage() {
  const [serviceItems, setServiceItems] = useState(initialServices)
  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] =
    useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [serviceToChangeStatus, setServiceToChangeStatus] =
    useState<Service | null>(null)

  const isServiceModalOpen = isCreateServiceModalOpen || selectedService !== null
  const serviceModalTitle = selectedService ? 'Serviço' : 'Cadastro de serviço'
  const statusActionLabel = serviceToChangeStatus?.isActive
    ? 'Desativar'
    : 'Reativar'

  function openCreateServiceModal() {
    setSelectedService(null)
    setIsCreateServiceModalOpen(true)
  }

  function openEditServiceModal(service: Service) {
    setIsCreateServiceModalOpen(false)
    setSelectedService(service)
  }

  function closeServiceModal() {
    setIsCreateServiceModalOpen(false)
    setSelectedService(null)
  }

  function openChangeStatusModal(service: Service) {
    setServiceToChangeStatus(service)
  }

  function closeChangeStatusModal() {
    setServiceToChangeStatus(null)
  }

  function handleConfirmStatusChange() {
    if (!serviceToChangeStatus) {
      return
    }

    setServiceItems((currentServices) =>
      currentServices.map((service) => {
        if (service.id !== serviceToChangeStatus.id) {
          return service
        }

        return {
          ...service,
          isActive: !service.isActive,
        }
      }),
    )

    closeChangeStatusModal()
  }

  function handleServiceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-blue-700 lg:text-2xl">
            Serviços
          </h1>

          <button
            type="button"
            onClick={openCreateServiceModal}
            aria-label="Cadastrar novo serviço"
            className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-zinc-900 text-white transition hover:bg-zinc-800 lg:h-10 lg:w-auto lg:gap-2 lg:px-5 lg:text-sm lg:font-semibold"
          >
            <Plus size={18} strokeWidth={2.4} />
            <span className="hidden lg:inline">Novo</span>
          </button>
        </div>

        <section className="mt-6 hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="w-[45%] px-4 py-4 text-[12px] font-bold text-slate-500">
                  Título
                </th>
                <th className="w-[32%] px-4 py-4 text-[12px] font-bold text-slate-500">
                  Valor
                </th>
                <th className="w-[23%] px-4 py-4 text-[12px] font-bold text-slate-500">
                  <div className="ml-auto flex w-[230px]">
                    <span className="inline-flex min-w-[58px] justify-center">
                      Status
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {serviceItems.map((service) => {
                const StatusIcon = service.isActive ? Ban : CircleCheck

                return (
                  <tr
                    key={service.id}
                    className="h-[72px] transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <strong className="text-sm font-bold text-slate-900">
                        {service.title}
                      </strong>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      {service.price}
                    </td>

                    <td className="px-4 py-4">
                      <div className="ml-auto flex w-[230px] items-center justify-between gap-3">
                        <span
                          className={[
                            'inline-flex h-7 min-w-[58px] items-center justify-center rounded-full px-3 text-xs font-bold',
                            getStatusClasses(service.isActive),
                          ].join(' ')}
                        >
                          {service.isActive ? 'Ativo' : 'Inativo'}
                        </span>

                        <button
                          type="button"
                          onClick={() => openChangeStatusModal(service)}
                          className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-slate-950"
                        >
                          <StatusIcon size={15} strokeWidth={2} />
                          {service.isActive ? 'Desativar' : 'Reativar'}
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditServiceModal(service)}
                          aria-label={`Editar serviço ${service.title}`}
                          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                        >
                          <Pencil size={14} strokeWidth={2.2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white lg:hidden">
          <div className="grid grid-cols-[1fr_80px] items-center border-b border-slate-200 bg-slate-50 px-4 py-4">
            <span className="text-[11px] font-bold text-slate-500">
              Título
            </span>
            <span className="text-[11px] font-bold text-slate-500">Valor</span>
          </div>

          <div className="divide-y divide-slate-100">
            {serviceItems.map((service) => {
              const StatusIcon = service.isActive ? Ban : CircleCheck

              return (
                <article key={service.id} className="px-4 py-4">
                  <div className="grid grid-cols-[1fr_80px] items-start gap-3">
                    <div className="min-w-0">
                      <strong className="block truncate text-sm font-bold text-slate-900">
                        {service.title}
                      </strong>

                      <span
                        className={[
                          'mt-2 inline-flex h-7 items-center rounded-full px-3 text-xs font-bold',
                          getStatusClasses(service.isActive),
                        ].join(' ')}
                      >
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    <span className="text-right text-sm font-semibold text-slate-900">
                      {service.price}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => openChangeStatusModal(service)}
                      className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-slate-950"
                    >
                      <StatusIcon size={15} strokeWidth={2} />
                      {service.isActive ? 'Desativar' : 'Reativar'}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditServiceModal(service)}
                      aria-label={`Editar serviço ${service.title}`}
                      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-slate-700 transition hover:bg-slate-300 hover:text-slate-950"
                    >
                      <Pencil size={14} strokeWidth={2.2} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 py-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              className="w-full max-w-[250px] rounded-lg bg-white p-4 shadow-xl sm:max-w-[360px] sm:p-5"
            >
              <h2
                id="service-modal-title"
                className="text-base font-bold text-slate-900"
              >
                {serviceModalTitle}
              </h2>

              <form onSubmit={handleServiceSubmit} className="mt-6">
                <div className="grid gap-5">
                  <div>
                    <label
                      htmlFor="service-title"
                      className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
                    >
                      Título
                    </label>
                    <input
                      id="service-title"
                      name="title"
                      type="text"
                      defaultValue={selectedService?.title ?? ''}
                      placeholder="Nome do serviço"
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service-price"
                      className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
                    >
                      Valor
                    </label>
                    <input
                      id="service-price"
                      name="price"
                      type="text"
                      defaultValue={selectedService?.price ?? ''}
                      placeholder="R$ 0,00"
                      className="mt-2 w-full border-0 border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700"
                    />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={closeServiceModal}
                    className="h-9 cursor-pointer rounded-md bg-slate-200 text-xs font-bold text-slate-900 transition hover:bg-slate-300"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="h-9 cursor-pointer rounded-md bg-zinc-900 text-xs font-bold text-white transition hover:bg-zinc-800"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {serviceToChangeStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 py-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-status-modal-title"
              className="w-full max-w-[280px] rounded-lg bg-white p-4 shadow-xl sm:max-w-[360px] sm:p-5"
            >
              <h2
                id="service-status-modal-title"
                className="text-base font-bold text-slate-900"
              >
                {statusActionLabel} serviço
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Tem certeza que deseja {statusActionLabel.toLowerCase()} o
                serviço{' '}
                <strong className="font-bold text-slate-900">
                  {serviceToChangeStatus.title}
                </strong>
                ?
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={closeChangeStatusModal}
                  className="h-9 cursor-pointer rounded-md bg-slate-200 text-xs font-bold text-slate-900 transition hover:bg-slate-300"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmStatusChange}
                  className="h-9 cursor-pointer rounded-md bg-zinc-900 text-xs font-bold text-white transition hover:bg-zinc-800"
                >
                  {statusActionLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
