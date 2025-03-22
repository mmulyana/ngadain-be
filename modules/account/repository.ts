import prisma from '../../shared/lib/prisma'

export const findById = async (id: string) => {
	return await prisma.user.findUnique({ where: { id } })
}
