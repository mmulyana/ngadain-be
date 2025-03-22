import prisma from '../../shared/lib/prisma'

export const create = async (data: any) => {
	console.log(data)
	await prisma.documentationEvent.create({ data })
}

export const readByEventId = async (eventId: string) => {
	await prisma.documentationEvent.findMany({ where: { eventId } })
}

export const destroy = async (id: string) =>
	await prisma.documentationEvent.delete({ where: { id } })
