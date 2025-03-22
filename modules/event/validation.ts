import { z } from 'zod'

export const EventSchema = z.object({
	userId: z.string().min(1, 'User ID is required'),
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	date: z.coerce.date(),
	address: z.string().min(1, 'Address is required'),
	category: z.string().min(1, 'Category is required'),
	isOnline: z.enum(['true', 'false']),
	mapUrl: z.string().optional(),
	linkUrl: z.string().optional(),
})
