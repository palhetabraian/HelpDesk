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
    className: 'bg-pink-50 text-pink-600 ring-pink-100',
    icon: CircleHelp,
  },
  EM_ATENDIMENTO: {
    label: 'Em atendimento',
    className: 'bg-blue-50 text-blue-600 ring-blue-100',
    icon: Clock,
  },
  ENCERRADO: {
    label: 'Encerrado',
    className: 'bg-green-50 text-green-600 ring-green-100',
    icon: CheckCircle,
  },
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const currentStatus = statusConfig[status]
  const Icon = currentStatus.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${currentStatus.className}`}
    >
      <Icon size={14} strokeWidth={2.4} />
      {currentStatus.label}
    </span>
  )
}
