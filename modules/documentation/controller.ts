import { Request, Response } from 'express'
import { ulid } from 'ulid'
import { create } from './repository'
import { createResponse } from '../../shared/utils/response'

export const createDocumentation = async (req: Request, res: Response) => {
	const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined

	const id = ulid()
	const result = await create({
		id,
		photoUrl,
		description: req.body.description,
		eventId: req.body.eventId,
	})

	res.json(createResponse(result, 'dokumentasi'))
}
