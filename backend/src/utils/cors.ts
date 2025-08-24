import cors from "cors";
import type { Express } from "express";

export const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://bavymo.com",
    "https://www.bavymo.com",
];

function getCorsOriginCallback() {
    return (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // allow requests with no origin (like Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    };
}

// ✅ For Express
export function useCors(app: Express) {
    app.use(cors({ origin: getCorsOriginCallback() }));
}

// ✅ For Socket.IO
export function getSocketCors() {
    return {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
    };
}