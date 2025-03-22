import { Request, Response } from 'express'
import { create } from './repository'
import { customResponse } from '../../shared/utils/response'

export const createFeedback = async (req: Request, res: Response) => {
	const result = await create({
		eventId: req.body.eventId,
		message: req.body.message,
		rating: req.body.rating,
		userId: req.body.userId,
	})

	res.json(customResponse(result, 'Feedback sudah dikirim, Terimakasih!!'))
}
