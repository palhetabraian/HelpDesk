import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({
  id,
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={inputId}
        className={`rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
        {...props}
      />

      {error ? (
        <span className="text-xs font-medium text-red-600">{error}</span>
      ) : null}
    </div>
  )
}
