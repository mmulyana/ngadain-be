import { Router } from 'express'
import { getMe, updateAccount } from './controller'
import upload from '../../shared/lib/multer'

const AccounRouter = Router()

AccounRouter.get('/me', getMe)
AccounRouter.patch('/update', upload.single('image'), updateAccount)

export default AccounRouter
