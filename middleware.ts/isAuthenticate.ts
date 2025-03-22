import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import prisma from '../shared/lib/prisma'

import dotenv from 'dotenv'
dotenv.config()

interface CustomError extends Error {
	status?: number
}

interface UserPayload extends JwtPayload {
	id: string
}

declare module 'express' {
	interface Request {
		user?: User
	}
}

const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			const error = new Error('Unauthorized') as CustomError
			error.status = 401
			throw error
		}

		const token = authHeader.split(' ')[1]
		const decoded = verify(token, process.env.SECRET || '') as UserPayload

		if (!decoded.id) {
			const error = new Error('Invalid Token') as CustomError
			error.status = 403
			throw error
		}

		const user = await prisma.user.findUnique({ where: { id: decoded.id } })
		if (!user) {
			const error = new Error('User not found') as CustomError
			error.status = 404
			throw error
		}

		req.user = user
		next()
	} catch (err) {
		const error = err as CustomError
		res.status(error.status || 500).json({ message: error.message })
	}
}

export default isAuthenticated
