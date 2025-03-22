import prisma from '../../shared/lib/prisma'

export const create = async (data: any) => await prisma.event.create({ data })

export const findById = (id: string) =>
	prisma.event.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					username: true,
					photoUrl: true,
				},
			},
			documentations: true,
			_count: {
				select: {
					participants: true,
				},
			},
		},
	})

export const findAll = () =>
	prisma.event.findMany({
		include: {
			user: {
				select: {
					id: true,
					username: true,
					photoUrl: true,
				},
			},
			_count: {
				select: {
					participants: true,
				},
			},
		},
	})

export const update = (id: string, data: any) =>
	prisma.event.update({ where: { id }, data })

export const remove = (id: string) => prisma.event.delete({ where: { id } })
