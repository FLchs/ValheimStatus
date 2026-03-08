import { createFileRoute } from '@tanstack/react-router'
import { useLocale } from '#/i18n/LocaleContext'
import { ConfigProvider } from '#/features/server-status/ConfigContext'
import { ServerCard } from '#/features/server-status/components/ServerCard'
import { m } from '#/i18n/messages'

function DemoComponent() {
  useLocale() // Subscribe to locale changes
  return (
    <ConfigProvider apiDomain="__demo__" serverDomain="demo.valheim.example.com">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="px-2 py-1 bg-amber-600/20 border border-amber-500/30 rounded text-xs font-semibold text-amber-400/80 uppercase tracking-wider">
            {m.demo_badge()}
          </span>
          <span className="text-xs text-parchment/50">
            {m.demo_description()}
          </span>
        </div>
        <ServerCard />
      </div>
    </ConfigProvider>
  )
}

export const Route = createFileRoute('/_localized/demo')({
  component: DemoComponent,
})
