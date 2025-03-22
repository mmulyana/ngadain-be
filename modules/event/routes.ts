import { Router } from 'express'
import {
	createEvent,
	getAllEvents,
	getEventById,
	updateEvent,
} from './controller'
import upload from '../../shared/lib/multer'

const EventRouter = Router()

EventRouter.post('/', upload.single('image'), createEvent)
EventRouter.patch('/:id', upload.single('image'), updateEvent)
EventRouter.get('/', getAllEvents)
EventRouter.get('/:id', getEventById)

export default EventRouter
