import path from "path";
import type { Express } from "express";
import express from "express";

export function useStaticFrontend(app: Express) {
    if (process.env.NODE_ENV !== "production") return;

    const frontendDistPath = path.join(__dirname, "../../../frontend/dist");

    // Serve static assets
    app.use(express.static(frontendDistPath));

    // SPA fallback (all non-API and non-socket routes → index.html)
    app.get(/^\/(?!api|socket).*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}