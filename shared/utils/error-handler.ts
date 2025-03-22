import { NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'

export interface CustomError extends Error {
	status?: number
	errors?: any
}

export const errorHandler = (
	error: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = error.status || 500
	console.log(error.message)
	console.log('errors', error?.errors)
	res.status(status).json({
		message: error.message,
		...(error.errors && { errors: error.errors }),
	})
}

export const errorParse = (data?: ZodError) => {
	const customError = new Error('Bad request') as CustomError
	customError.status = 401
	if (data)
		customError.errors = data.errors.map((err) => ({
			code: err.code,
			path: err.path,
			message: err.message,
		}))

	throw customError
}

export const throwError = (message: string, status: number) => {
	const error = new Error(message) as any
	error.status = status
	throw error
}
