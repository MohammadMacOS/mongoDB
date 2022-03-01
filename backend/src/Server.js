import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from "helmet";
import MorganMiddleware from "./middleWares/MorganMiddleware.js";
import Middlewares from "./middleWares/Middlewares.js"
import Configuration from "./Configuration/Configuration.js"
import UserRoutes from "./routes/ToDoListRoutes.js";
import Logger from "./utils/Logger.js";
import mongoose from "mongoose";



dotenv.config()
const app = express()


// Middleware
app.use(helmet())
// app.use(morgan('combined'))
app.use(MorganMiddleware)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(Middlewares?.errorHandler)


// Api alive route
app.get('/', (req, res) => {
    res.send('Api is Alive!')
})

UserRoutes.routes(app)

// Place After all valid urls
app.use(Middlewares?.notFound)


Configuration.connectToDatabase()
Configuration.connectToPort(app)

export default app