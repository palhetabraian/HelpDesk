import { CheckCircle, CircleHelp, Clock } from 'lucide-react'

import type { TicketStatus } from '../../types/ticket'

type TicketStatusBadgeProps = {
  status: TicketStatus
}

const statusConfig: Record<
  TicketStatus,
  {
    label: string
    className: string
    icon: typeof CircleHelp
  }
> = {
  ABERTO: {
    label: 'Aberto',
    className: 'bg-pink-100 text-pink-600 ring-pink-200',
    icon: CircleHelp,
  },
  EM_ATENDIMENTO: {
    label: 'Em atendimento',
    className: 'bg-blue-100 text-blue-600 ring-blue-200',
    icon: Clock,
  },
  ENCERRADO: {
    label: 'Encerrado',
    className: 'bg-green-100 text-green-700 ring-green-200',
    icon: CheckCircle,
  },
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const currentStatus = statusConfig[status]
  const Icon = currentStatus.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${currentStatus.className}`}
    >
      <Icon size={13} strokeWidth={2.4} />
      {currentStatus.label}
    </span>
  )
}
