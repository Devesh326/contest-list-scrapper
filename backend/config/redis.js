const redis = require('redis')
const { createClient } = require('redis')

const REDIS_PORT = process.env.PORT || 6379
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'

// const redisClient = createClient(REDIS_PORT) // this creates a new client

const redisClient = redis.createClient({
	REDIS_PORT,
	REDIS_HOST,
	legacyMode: true,
})
;(async () => {
	await redisClient.connect()
})()

console.log('Connecting to the Redis')

redisClient.on('ready', () => {
	console.log('Connected!')
})

redisClient.on('error', async (err) => {
	console.log('Error in the Connection')
})

module.exports = redisClient
