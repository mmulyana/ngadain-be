import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { errorParse, throwError } from '../../shared/utils/error-handler'
import { customResponse } from '../../shared/utils/response'

import { create, findByEmail, findByUsername } from './repository'
import { LoginSchema, RegisterSchema } from './validation'

import dotenv from 'dotenv'
dotenv.config()

export const login = async (req: Request, res: Response) => {
	const parsed = LoginSchema.safeParse(req.body)
	if (!parsed.success) {
		return errorParse(parsed.error)
	}

	const { email, username, password } = parsed.data
	let user
	if (email) {
		user = await findByEmail(email)
	}

	if (username) {
		user = await findByUsername(username)
	}

	if (!user) {
		return throwError('User tidak ditemukan', 401)
	}
	if (!user || !(await compare(password, user.password))) {
		return throwError('Kredensial salah', 401)
	}

	const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
		expiresIn: '7d',
	})

	res.json(
		customResponse(
			{
				token,
				user: {
					fullname: user.fullname,
					username: user.username,
					photoUrl: user.photoUrl,
					role: user.role,
				},
			},
			'Berhasil masuk'
		)
	)
}

export const register = async (req: Request, res: Response) => {
	const parsed = RegisterSchema.safeParse(req.body)
	if (!parsed.success) {
		return errorParse(parsed.error)
	}

	const result = await create(parsed.data)

	const token = jwt.sign({ id: result.id }, process.env.SECRET as string, {
		expiresIn: '7d',
	})

	res.json(
		customResponse(
			{
				token,
				user: {
					fullname: result.fullname,
					username: result.username,
					photoUrl: result.photoUrl,
					role: result.role,
				},
			},
			'Berhasil daftar'
		)
	)
}
