import { z } from 'zod'

export const ServerStatusSchema = z.object({
  last_status_update: z.string(),
  error: z.string().nullable(),
  server_name: z.string(),
  server_type: z.string(),
  platform: z.string(),
  player_count: z.number(),
  password_protected: z.boolean(),
  port: z.number(),
  keywords: z.string(),
})

export type ServerStatus = z.infer<typeof ServerStatusSchema>
