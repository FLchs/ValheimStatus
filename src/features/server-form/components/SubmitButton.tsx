import { Activity, Loader2 } from 'lucide-react'

interface SubmitButtonProps {
  isSubmitting: boolean
  canSubmit: boolean
  submittingLabel: string
  submitLabel: string
}

export function SubmitButton({
  isSubmitting,
  canSubmit,
  submittingLabel,
  submitLabel,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className="w-full sm:w-auto sm:min-w-[200px] mx-auto block bg-linear-to-b from-amber-600/90 to-amber-700/90 hover:from-amber-500/90 hover:to-amber-600/90 hover:scale-[1.02] active:scale-[0.98] text-white font-['Cinzel'] text-base py-3 px-8 rounded-lg border-2 border-amber-500/50 shadow-lg shadow-amber-900/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {submittingLabel}
        </>
      ) : (
        <>
          <Activity className="w-4 h-4" />
          {submitLabel}
        </>
      )}
    </button>
  )
}
