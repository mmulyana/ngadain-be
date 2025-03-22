import prisma from '../../shared/lib/prisma'
import { deleteFile } from '../../shared/utils/delete-file'
import { throwError } from '../../shared/utils/error-handler'

export const findById = async (id: string) => {
	return await prisma.user.findUnique({ where: { id } })
}

export const update = async (data: any) => {
	const existing = await prisma.user.findUnique({ where: { id: data.id } })
	if (existing?.photoUrl && data.photoUrl) {
		deleteFile(existing.photoUrl)
	}

	if (!existing) {
		return throwError('Data tidak ditemukan', 400)
	}

	const result = await prisma.user.update({
		where: { id: data.id },
		data: {
			fullname: data.fullname,
			email: data.email,
			username: data.username,
			photoUrl: data.photoUrl,
		},
	})

	return result
}
