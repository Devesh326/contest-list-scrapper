const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const FRONTEND_URL = process.env.FRONTEND_URL


console.log(FRONTEND_URL)
app.use(
	cors({
		origin: {
			'http://localhost:3000': true,
			FRONTEND_URL: true,
		},
		// origin: '*', // Allow from anywhere
		credentials: true,
	}),
)
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000

require('./config/database')
require('./services/scraping/scrape')

const contestsRoute = require('./routes/contestData')
const calendarRoute = require('./routes/calendarRoute')
const testRoute = require('./routes/testRoute')
const verifyToken = require('./controller/verifyToken')

app.use('/contests', contestsRoute)
app.use('/create-event', calendarRoute)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
