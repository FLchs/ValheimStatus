import { createFileRoute } from '@tanstack/react-router'
import { useLocale } from '#/i18n/LocaleContext'
import { ConfigProvider } from '#/features/server-status/ConfigContext'
import { ServerCard } from '#/features/server-status/components/ServerCard'

function DemoComponent() {
  useLocale() // Subscribe to locale changes
  return (
    <ConfigProvider apiDomain="__demo__" serverDomain="demo.valheim.example.com">
      <ServerCard />
    </ConfigProvider>
  )
}

export const Route = createFileRoute('/_localized/demo')({
  component: DemoComponent,
})
