import prisma from '../../shared/lib/prisma'

export const create = (data: any) => prisma.event.create({ data })

export const findById = (id: string) =>
	prisma.event.findUnique({ where: { id } })

export const findAll = () => prisma.event.findMany()

export const update = (id: string, data: any) =>
	prisma.event.update({ where: { id }, data })

export const remove = (id: string) => prisma.event.delete({ where: { id } })
