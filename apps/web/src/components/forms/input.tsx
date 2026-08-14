import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
  error?: string
}

export function Input({
  id,
  label,
  helperText,
  error,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600"
      >
        {label}
      </label>

      <input
        id={inputId}
        className={`mt-4 border-0 border-b border-slate-200 bg-transparent px-0 pb-3 text-2xl text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 sm:text-3xl ${className}`}
        {...props}
      />

      {helperText ? (
        <span className="mt-3 text-sm italic text-slate-500 sm:text-base">
          {helperText}
        </span>
      ) : null}

      {error ? (
        <span className="mt-2 text-xs font-medium text-red-600">{error}</span>
      ) : null}
    </div>
  )
}
