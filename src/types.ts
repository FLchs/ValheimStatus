import { z } from 'zod'

export const PlayerSchema = z.object({
  name: z.string(),
  steam_id: z.string().optional(),
})

export const ServerStatusSchema = z.object({
  last_status_update: z.string(),
  error: z.string().nullable(),
  server_name: z.string(),
  server_type: z.string(),
  platform: z.string(),
  player_count: z.number(),
  password_protected: z.boolean(),
  vac_enabled: z.boolean(),
  port: z.number(),
  steam_id: z.number(),
  keywords: z.string(),
  game_id: z.number(),
  players: z.array(PlayerSchema),
})

export type ServerStatus = z.infer<typeof ServerStatusSchema>
export type Player = z.infer<typeof PlayerSchema>
