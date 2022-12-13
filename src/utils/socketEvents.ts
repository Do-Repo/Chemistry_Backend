import * as WebSocket from 'ws';
import { verifyJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';

export async function handle_socket_events(socket: WebSocket, req: any ) {
    const token = req.url.substring(1);
    var stored_sockets = new Map();

    const decoded = verifyJwt<{ sub: string }>(token);
    if (!decoded) {
        socket.close();
        return;
    }

    const session = await redisClient.get(decoded.sub);
    if (!session) {
        socket.close();
        return;
    }

    let userID = JSON.parse(session)._id;

    stored_sockets.set(userID, socket);
    console.log('Client connected with id: %s', userID);
   
    socket.on('message', (data: string) => {
        var message = JSON.parse(data)
        console.log(message.name)
    });

    socket.on('error', (err: Error) => {
        console.log('Error: %s', err.message);
    });

    socket.on('close', () => {
        stored_sockets.delete(userID);
        console.log('Client disconnected with id: %s', userID);
    });

}