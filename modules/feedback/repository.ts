import prisma from '../../shared/lib/prisma'

export const create = async (data: {
	eventId: string
	userId: string
	rating: number
	message: string
}) => await prisma.eventFeedback.create({ data })
