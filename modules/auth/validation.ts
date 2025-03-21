import { z } from 'zod'

export const RegisterSchema = z.object({
	fullname: z.string(),
	email: z.string(),
	password: z.string(),
	role: z.enum(['participant', 'organizer']),
})

export const LoginSchema = z
	.object({
		username: z.string().optional(),
		email: z.string().email().optional(),
		password: z.string(),
	})
	.refine(
		(data) => {
			return Boolean(data.username || data.email)
		},
		{
			message: 'Minimal isi salah satu nama, email',
			path: ['username', 'email'],
		}
	)

export type Register = z.infer<typeof RegisterSchema>
export type Login = z.infer<typeof LoginSchema>
