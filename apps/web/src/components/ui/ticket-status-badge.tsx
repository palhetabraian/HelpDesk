import type { TicketStatus } from '../../types/ticket'

type TicketStatusBadgeProps = {
  status: TicketStatus
}

const statusConfig: Record<
  TicketStatus,
  {
    label: string
    className: string
  }
> = {
  ABERTO: {
    label: 'Aberto',
    className: 'bg-pink-50 text-pink-600 ring-pink-100',
  },
  EM_ATENDIMENTO: {
    label: 'Em atendimento',
    className: 'bg-blue-50 text-blue-600 ring-blue-100',
  },
  ENCERRADO: {
    label: 'Encerrado',
    className: 'bg-green-50 text-green-600 ring-green-100',
  },
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const currentStatus = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${currentStatus.className}`}
    >
      {currentStatus.label}
    </span>
  )
}
