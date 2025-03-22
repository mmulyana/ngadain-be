import { Router } from 'express'
import {
	createEvent,
	getAllEvents,
	getAllJoinedEvents,
	getCheck,
	getEventById,
	registerParticipant,
	updateEvent,
} from './controller'
import upload from '../../shared/lib/multer'

const EventRouter = Router()

EventRouter.post('/', upload.single('image'), createEvent)
EventRouter.patch('/:id', upload.single('image'), updateEvent)
EventRouter.get('/', getAllEvents)
EventRouter.get('/:id', getEventById)
EventRouter.get('/:id/check', getCheck)

EventRouter.get('/joined/:userId', getAllJoinedEvents)

EventRouter.post('/register', registerParticipant)

export default EventRouter
