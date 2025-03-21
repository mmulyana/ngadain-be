import { ulid } from 'ulid'

import prisma from '../../shared/lib/prisma'
import { Register } from './validation'

export const create = async (payload: Register) => {
	const id = ulid()
	return await prisma.user.create({
		data: {
			id,
			email: payload.email,
			fullname: payload.fullname,
			password: payload.password,
			role: payload.role,
		},
	})
}

export const findByUsername = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } })
}

export const findByEmail = async (email: string) => {
	return await prisma.user.findUnique({ where: { email } })
}
