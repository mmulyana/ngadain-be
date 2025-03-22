import { Router } from 'express'

import AuthRouter from './auth/routes'
import EventRouter from './event/routes'
import isAuthenticated from '../middleware.ts/isAuthenticate'
import AccounRouter from './account/routes'

const routes = Router()

routes.use('/auth', AuthRouter)
routes.use('/event', isAuthenticated, EventRouter)
routes.use('/account', isAuthenticated, AccounRouter)

export default routes
