import { Router } from 'express'
import { getMe } from './controller'

const AccounRouter = Router()

AccounRouter.get('/me', getMe)

export default AccounRouter
