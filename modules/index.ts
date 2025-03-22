import { Router } from 'express'

import AuthRouter from './auth/routes'
import EventRouter from './event/routes'

const routes = Router()

routes.use('/auth', AuthRouter)
routes.use('/event', EventRouter)

export default routes
