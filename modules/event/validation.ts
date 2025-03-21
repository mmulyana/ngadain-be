import { z } from 'zod'

export const EventSchema = z.object({
	name: z.string(),
	description: z.string(),
	date: z.date(),
	address: z.string(),
	category: z.string(),
	isOnline: z.boolean().default(false),
	mapUrl: z.string().optional(),
	linkUrl: z.string().optional(),
})

export type Event = z.infer<typeof EventSchema>
