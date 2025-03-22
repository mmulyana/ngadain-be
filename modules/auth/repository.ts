import { Prisma } from '@prisma/client'
import { ulid } from 'ulid'

import { generateUsername } from '../../shared/utils/generate-username'
import prisma from '../../shared/lib/prisma'
import { Register } from './validation'

import { hash } from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

export const create = async (payload: Register) => {
	try {
		const id = ulid()
		const hashedPassword = await hash(payload.password, 10)
		const username = await generateUsername()
		return await prisma.user.create({
			data: {
				id,
				email: payload.email,
				fullname: payload.fullname,
				password: hashedPassword,
				role: payload.role,
				username,
			},
		})
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				const target = Array.isArray(error.meta?.target)
					? error.meta.target[0]
					: 'data'

				throw new Error(`Akun dengan ${target} ini sudah terdaftar.`)
			}
		}
		throw error
	}
}

export const findByUsername = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } })
}

export const findByEmail = async (email: string) => {
	return await prisma.user.findUnique({ where: { email } })
}
