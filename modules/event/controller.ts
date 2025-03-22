import { Request, Response } from 'express'
import { errorParse, throwError } from '../../shared/utils/error-handler'
import { customResponse } from '../../shared/utils/response'

import { create, findById, findAll, update, remove } from './repository'
import { EventSchema } from './validation'

export const createEvent = async (req: Request, res: Response) => {
	const parsed = EventSchema.safeParse(req.body)
	if (!parsed.success) {
		return errorParse(parsed.error)
	}

	const result = await create(parsed.data)
	res.json(customResponse(result, 'Event berhasil dibuat'))
}

export const getEventById = async (req: Request, res: Response) => {
	const event = await findById(req.params.id)
	if (!event) {
		return throwError('Event tidak ditemukan', 404)
	}

	res.json(customResponse(event, 'Detail event'))
}

export const getAllEvents = async (req: Request, res: Response) => {
	const events = await findAll()
	res.json(customResponse(events, 'Daftar event'))
}

export const updateEvent = async (req: Request, res: Response) => {
	const parsed = EventSchema.partial().safeParse(req.body)
	if (!parsed.success) {
		return errorParse(parsed.error)
	}

	const result = await update(req.params.id, parsed.data)
	res.json(customResponse(result, 'Event berhasil diperbarui'))
}

export const deleteEvent = async (req: Request, res: Response) => {
	await remove(req.params.id)
	res.json(customResponse(null, 'Event berhasil dihapus'))
}
