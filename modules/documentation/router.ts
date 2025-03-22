import { Router } from 'express'
import { createDocumentation } from './controller'
import upload from '../../shared/lib/multer'

const DocRouter = Router()

DocRouter.post('/', upload.single('image'), createDocumentation)

export default DocRouter
