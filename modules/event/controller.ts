import { Request, Response } from 'express'
import { errorParse, throwError } from '../../shared/utils/error-handler'
import { customResponse, successResponse } from '../../shared/utils/response'

import {
	create,
	findById,
	findAll,
	update,
	remove,
	registerAsParticipant,
	findMyParticipant,
} from './repository'
import { EventSchema } from './validation'
import { ulid } from 'ulid'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const createEvent = async (req: Request, res: Response) => {
	const parsed = EventSchema.safeParse(req.body)
	const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined
	if (!parsed.success) {
		return errorParse(parsed.error)
	}

	const id = ulid()
	const result = await create({
		...parsed.data,
		id,
		isOnline: parsed.data.isOnline === 'true',
		photoUrl,
	})
	res.json(customResponse(result, 'Event berhasil dibuat'))
}

export const getEventById = async (req: Request, res: Response) => {
	const event = await findById(req.params.id)
	if (!event) {
		return throwError('Event tidak ditemukan', 404)
	}

	const result = {
		...event,
		date: format(event.date, 'dd MMM yyyy', {
			locale: id,
		}),
	}
	res.json(customResponse(result, 'Detail event'))
}

export const getAllEvents = async (req: Request, res: Response) => {
	const events = await findAll()
	const payload = events.map((item) => ({
		...item,
		date: format(item.date, 'dd MMM yyyy', {
			locale: id,
		}),
	}))
	res.json(customResponse(payload, 'Daftar event'))
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

export const registerParticipant = async (req: Request, res: Response) => {
	await registerAsParticipant(req.body)
	res.json(customResponse(null, 'Akun anda berhasil terdaftar'))
}

export const getCheck = async (req: Request, res: Response) => {
	const result = await findMyParticipant(
		req.query.userId as string,
		req.params.id as string
	)
	if (!result) {
		res.json(successResponse({ status: 'not_register' }, 'check pendaftaran'))
	}

	const event = await findById(req.params.id as string)
	if (event?.date) {
		const eventDate = new Date(event.date)
		const today = new Date()

		if (eventDate < today) {
			res.json(successResponse({ status: 'done' }, 'check pendaftaran'))
		}
	}

	res.json(successResponse({ status: 'registered' }, 'check pendaftaran'))
}
