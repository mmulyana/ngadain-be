import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import routes from './modules'
import { errorHandler } from './shared/utils/error-handler'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
	res.json({ message: 'welcome' })
})
app.use('/api', routes)

app.use(errorHandler)

const PORT = 4000
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
