import prisma from '../lib/prisma'

export const generateUsername = async (): Promise<string> => {
	const timestamp = Date.now().toString().slice(-6)
	const random = Math.floor(Math.random() * 9000) + 1000
	const username = `user${timestamp}${random}`

	const existingUser = await prisma.user.findUnique({ where: { username } })
	if (existingUser) {
		return generateUsername()
	}

	return username
}
