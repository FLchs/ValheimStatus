import { useStore } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'

interface ApiDomainFieldProps {
  field: AnyFieldApi
  label: string
  placeholder?: string
  helpText?: string
}

export default function ApiDomainField({
  field,
  label,
  placeholder,
  helpText,
}: ApiDomainFieldProps) {
  const meta = useStore(field.store, (state) => state.meta)
  const { errors, isTouched } = meta

  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm text-parchment/80 mb-1 font-['Cinzel']"
      >
        {label}
      </label>
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        className="w-full bg-stone-800/60 border border-stone-600/50 rounded-lg px-3 py-2 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
      />
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
