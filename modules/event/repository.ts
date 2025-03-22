import { ulid } from 'ulid'
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

export const findAll = (userId?: string) =>
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
		where: userId ? { userId } : {},
	})

export const update = (id: string, data: any) =>
	prisma.event.update({ where: { id }, data })

export const remove = (id: string) => prisma.event.delete({ where: { id } })

export const registerAsParticipant = async (data: {
	userId: string
	eventId: string
	fullname: string
	email: string
}) => {
	const id = ulid()
	return await prisma.eventParticipants.create({
		data: {
			id,
			email: data.email,
			fullname: data.fullname,
			userId: data.userId,
			eventId: data.eventId,
			registrationDate: new Date().toISOString(),
		},
	})
}

export const findMyParticipant = async (userId: string, eventId: string) => {
	return await prisma.eventParticipants.findFirst({
		where: {
			AND: [{ userId }, { eventId }],
		},
	})
}

export const findMyFeedback = async (userId: string, eventId: string) => {
	return await prisma.eventFeedback.findFirst({
		where: {
			AND: [{ userId }, { eventId }],
		},
	})
}

export const findMyEventParticipant = async (userId: string) => {
	return await prisma.eventParticipants.findMany({
		where: { userId },
		include: {
			event: {
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
			},
		},
	})
}

export const getFeedbackStats = async (eventId: string) => {
	return prisma.eventFeedback.groupBy({
		by: ['rating'],
		where: { eventId },
		_count: { rating: true },
	})
}

export const getPresenceStats = async (eventId: string) => {
	return prisma.eventParticipants.groupBy({
		by: ['isPresence'],
		where: { eventId },
		_count: { isPresence: true },
	})
}

export const getParticipantPresence = async (eventId: string) => {
	return prisma.eventParticipants.findMany({
		where: {
			eventId,
		},
		select: {
			fullname: true,
			isPresence: true,
		},
	})
}
export const getParticipantFeedback = async (eventId: string) => {
	return prisma.eventFeedback.findMany({
		where: {
			eventId,
		},
		select: {
			user: {
				select: {
					fullname: true,
				},
			},
			message: true,
			rating: true,
		},
	})
}
