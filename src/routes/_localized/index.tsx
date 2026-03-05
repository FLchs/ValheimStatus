import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ServerFormPage } from '../../features/server/ServerFormPage'
import { useLocale } from '../../i18n/LocaleContext'

const searchSchema = z.object({
  api: z.string().optional(),
  server: z.string().optional(),
})

function IndexComponent() {
  useLocale() // Subscribe to locale changes
  return <ServerFormPage />
}

export const Route = createFileRoute('/_localized/')({
  component: IndexComponent,
  validateSearch: searchSchema,
})
