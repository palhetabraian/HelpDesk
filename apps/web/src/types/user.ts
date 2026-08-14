export type UserRole = 'ADMIN' | 'TECHNICIAN' | 'CLIENT'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatarURL: string | null
}
