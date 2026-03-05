import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import TextField from "../../components/form/TextField";
import { SubmitButton } from "../../components/form/SubmitButton";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { testApi } from "./serverForm";
import { m } from "../../i18n/messages";
import { Route } from "../../routes/_localized/index";

export function ServerFormPage() {
  const navigate = useNavigate();
  const { api, server } = Route.useSearch();

  const form = useForm({
    defaultValues: {
      apiAddress: api ?? "",
      serverAddress: server ?? "",
    },
    onSubmit: async ({ value }) => {
      const encodedApi = encodeURIComponent(value.apiAddress);
      const encodedServer = encodeURIComponent(value.serverAddress);
      await navigate({ to: `/s/${encodedApi}/${encodedServer}` });
    },
  });

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
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="bg-linear-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50 space-y-6"
        >
          {/* API Domain Field */}
          <form.Field
            name="apiAddress"
            validators={{
              onChange: ({ value }) =>
                !value || value.trim() === "" ? m.form_error_required() : undefined,
              onSubmitAsync: async ({ value }) => {
                const isReachable = await testApi(value);
                return !isReachable ? m.form_error_unreachable({ domain: value }) : undefined;
              },
            }}
          >
            {(field) => (
              <TextField
                field={field}
                label={m.form_api_domain_label()}
                placeholder={m.form_api_domain_placeholder()}
                helpText={m.form_api_domain_help()}
                showValidationIndicator
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

          {/* Single CTA Button */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
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
          <p className="text-xs text-parchment/40 text-center pt-2">{m.form_footer_text()}</p>
        </form>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </div>
  );
}
