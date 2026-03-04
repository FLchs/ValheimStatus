import { useStore } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'

interface TextFieldProps {
  field: AnyFieldApi
  label: string
  placeholder?: string
  helpText?: string
  showValidationIndicator?: boolean
}

export default function TextField({
  field,
  label,
  placeholder,
  helpText,
  showValidationIndicator = false,
}: TextFieldProps) {
  const meta = useStore(field.store, (state) => state.meta)
  const { errors, isValidating, isTouched } = meta

  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm text-parchment/80 mb-1 font-['Cinzel']"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className="w-full bg-stone-800/60 border border-stone-600/50 rounded-lg px-3 py-2 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
        />
        {showValidationIndicator && isValidating && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
          </div>
        )}
      </div>
      {isTouched && errors.map((error: string) => (
        <p key={error} className="text-xs text-red-400/80 mt-1">
          {error}
        </p>
      ))}
      {helpText && (
        <p className="text-xs text-parchment/50 mt-1">{helpText}</p>
      )}
    </div>
  )
}
