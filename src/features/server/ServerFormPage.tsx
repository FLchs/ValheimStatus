import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import TextField from '../../components/form/TextField'
import ApiDomainField from '../../components/form/ApiDomainField'
import { SubmitButton } from '../../components/form/SubmitButton'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import { testApi } from './serverForm'
import { m } from '../../i18n/messages'

export function ServerFormPage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      apiAddress: '',
      serverAddress: '',
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      
      // Validate API is reachable before navigating
      const isReachable = await testApi(value.apiAddress)
      if (!isReachable) {
        setSubmitError(m.form_error_unreachable({ domain: value.apiAddress }))
        return
      }
      
      const encodedApi = encodeURIComponent(value.apiAddress)
      const encodedServer = encodeURIComponent(value.serverAddress)
      await navigate({ to: `/s/${encodedApi}/${encodedServer}` })
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400 font-['Cinzel_Decorative'] tracking-wider drop-shadow-lg">
            {m.header_title()}
          </h1>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-amber-600 to-transparent mx-auto mt-4" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="bg-linear-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
            <div className="space-y-6">
              {/* API Domain Field */}
              <form.Field
                name="apiAddress"
                validators={{
                  onChange: ({ value }) => {
                    if (!value || value.trim() === '') {
                      return 'API address is required'
                    }
                  },
                }}
              >
                {(field) => (
                  <ApiDomainField
                    field={field}
                    label={m.form_api_domain_label()}
                    placeholder={m.form_api_domain_placeholder()}
                    helpText={m.form_api_domain_help()}
                  />
                )}
              </form.Field>

              {/* Server Address Field - Optional */}
              <form.Field name="serverAddress">
                {(field) => (
                  <TextField
                    field={field}
                    label={m.form_server_address_label()}
                    placeholder={m.form_server_address_placeholder()}
                    helpText={m.form_server_address_help()}
                  />
                )}
              </form.Field>

              {/* Submit Error Message */}
              {submitError && (
                <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                  <p className="text-sm text-red-300">{submitError}</p>
                </div>
              )}

              {/* Single CTA Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="pt-4 flex justify-center">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      canSubmit={canSubmit}
                      submittingLabel={m.form_button_submitting()}
                      submitLabel={m.form_button_save()}
                    />
                  </div>
                )}
              </form.Subscribe>

              {/* Footer hint */}
              <p className="text-xs text-parchment/40 text-center pt-2">
                {m.form_footer_text()}
              </p>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
