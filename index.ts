import cors from 'cors'
import express, { Request, Response } from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())




