import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  isLoading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-200',
  secondary:
    'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus:ring-zinc-100',
}

export function Button({
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex h-14 cursor-pointer items-center justify-center rounded-lg px-4 text-base font-semibold outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  )
}
