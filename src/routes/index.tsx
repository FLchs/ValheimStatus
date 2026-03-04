import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Check, ChevronRight, HelpCircle, Loader2, TestTube2, X } from "lucide-react";
import { m } from "../i18n/messages";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

async function testApi(api: string) {
  try {
    const response = await fetch(`https://${api}/status.json`, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

const schema = z.object({
  apiAddress: z.string().refine(async (val) => testApi(val), { message: "Unreachable" }),
  serverAddress: z.string(),
});

function RouteComponent() {
  const [hasAttemptedValidation, setHasAttemptedValidation] = useState(false);

  const form = useForm({
    defaultValues: {
      apiAddress: "",
      serverAddress: "",
    },
    validators: {
      onSubmitAsync: schema,
    },
  });

  const testApiField = async () => {
    setHasAttemptedValidation(true);
    await form.validate("submit");
  };

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
            setHasAttemptedValidation(true);
            form.handleSubmit();
          }}
        >
          <div className="bg-linear-to-b from-stone-900/80 to-stone-950/90 border-2 border-stone-700/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
            <div className="space-y-6">
              {/* API Domain Field */}
              <form.Field
                name="apiAddress"
                children={(field) => {
                  const isValid = field.state.meta.isValid && hasAttemptedValidation;
                  const isValidating = field.state.meta.isValidating;
                  const hasErrors =
                    !field.state.meta.isValid &&
                    hasAttemptedValidation &&
                    field.state.meta.errors.length > 0;
                  const isUntested = field.state.value && !hasAttemptedValidation;

                  return (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="block text-sm text-parchment/80 mb-1 font-['Cinzel']"
                      >
                        {m.form_api_domain_label()}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            setHasAttemptedValidation(false);
                            field.handleChange(e.target.value);
                          }}
                          placeholder={m.form_api_domain_placeholder()}
                          className="flex-1 bg-stone-800/60 border border-stone-600/50 rounded-lg px-3 py-2 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                        />
                        {isValid && (
                          <div className="flex items-center justify-center w-8 h-8 bg-green-600/20 rounded-lg border border-green-500/50">
                            <Check className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                        {hasErrors && (
                          <div className="flex items-center justify-center w-8 h-8 bg-red-600/20 rounded-lg border border-red-500/50">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                        {isUntested && !isValidating && (
                          <div className="flex items-center justify-center w-8 h-8 bg-stone-600/20 rounded-lg border border-stone-500/50">
                            <HelpCircle className="w-5 h-5 text-stone-400" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-parchment/50 mt-1">{m.form_api_domain_help()}</p>
                      {isValidating && (
                        <p className="text-xs text-amber-400/80 mt-1">{m.form_button_testing()}</p>
                      )}
                    </div>
                  );
                }}
              />

              {/* Server Address Field */}
              <form.Field
                name="serverAddress"
                children={(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm text-parchment/80 mb-1 font-['Cinzel']"
                    >
                      {m.form_server_address_label()}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={m.form_server_address_placeholder()}
                      className="w-full bg-stone-800/60 border border-stone-600/50 rounded-lg px-3 py-2 text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                    />
                    <p className="text-xs text-parchment/50 mt-1">{m.form_server_address_help()}</p>
                  </div>
                )}
              />

              {/* Buttons */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
                children={([canSubmit, isSubmitting, isValidating]) => (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={testApiField}
                      disabled={isValidating || isSubmitting}
                      className="flex-1 bg-stone-700/80 hover:bg-stone-600/80 disabled:opacity-50 disabled:cursor-not-allowed text-parchment font-['Cinzel'] text-sm py-2.5 px-4 rounded-lg border border-stone-600/50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isValidating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {m.form_button_testing()}
                        </>
                      ) : (
                        <>
                          <TestTube2 className="w-4 h-4" />
                          {m.form_button_test()}
                        </>
                      )}
                    </button>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex-1 bg-linear-to-b from-amber-600/90 to-amber-700/90 hover:from-amber-500/90 hover:to-amber-600/90 text-white font-['Cinzel'] text-sm py-2.5 px-4 rounded-lg border border-amber-500/50 shadow-lg shadow-amber-900/30 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {m.form_button_testing()}
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-4 h-4" />
                          {m.form_button_save()}
                        </>
                      )}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
