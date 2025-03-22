import { Request, Response } from 'express'
import { throwError } from '../../shared/utils/error-handler'
import { findById, update } from './repository'
import { customResponse, updateResponse } from '../../shared/utils/response'

export const getMe = async (req: Request, res: Response) => {
	if (!req.user) {
		return throwError('User tidak ada', 401)
	}
	const result = await findById(req.user?.id)
	res.json(
		customResponse(
			{
				user: {
					fullname: result?.fullname,
					username: result?.username,
					photoUrl: result?.photoUrl,
					role: result?.role,
					id: result?.id,
				},
			},
			'Berhasil daftar'
		)
	)
}

export const updateAccount = async (req: Request, res: Response) => {
	const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined
	const result = await update({ ...req.body, photoUrl })
	res.json(updateResponse(result, 'akun'))
}
