import { Router } from 'express'
import { createFeedback } from './controller'

const FeedbackRouter = Router()

FeedbackRouter.post('/', createFeedback)

export default FeedbackRouter
