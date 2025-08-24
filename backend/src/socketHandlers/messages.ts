import { type Socket } from "socket.io";

// This will be used directly in socket.on("message", ...)
export function handleMessage(this: Socket, msg: string) {
    console.log(`📩 Message from ${this.id}:`, msg);

    // Send a reply to the same client
    this.emit("reply", { text: `Server received: ${msg}` });

    // Optional: broadcast to all clients except sender
    // this.broadcast.emit("reply", { text: `${this.id} says: ${msg}` });
}