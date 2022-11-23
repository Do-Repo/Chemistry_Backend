import { createClient } from 'redis';
import { setTimeout } from 'timers/promises';

const redisURL = `redis://localhost:6379`;
const redisClient = createClient({
    url: redisURL,
})

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis!');
    }catch(error: any) {
        console.log(error.message);
        setTimeout(5000, connectRedis);
    }
}

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;