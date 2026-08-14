export type TicketStatus = 'ABERTO' | 'EM_ATENDIMENTO' | 'ENCERRADO'

export type Ticket = {
  id: string
  description: string
  status: TicketStatus
  clientId: string
  technicianId: string
  createdAt: string
  updatedAt: string
}
