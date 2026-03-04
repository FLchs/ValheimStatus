import { createFileRoute } from '@tanstack/react-router'
import { ServerFormPage } from '../features/server/ServerFormPage'

export const Route = createFileRoute('/')({
  component: ServerFormPage,
})
