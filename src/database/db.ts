import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url:
    process.env.DATABASE_URL! ||
    "libsql://wave-chat-application-developer-sain.turso.io",
  authToken:
    process.env.DATABASE_AUTH_TOKEN! ||
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM3NDMyOTcsImlkIjoiY2Q4MTZjOGUtN2JiZS00NTRjLTg2OGItN2I0ZDA2MWE4NDFiIn0.Jb16su72ms3uMU4H_yphtmzRA5Q2T6H6C7a3VR23Ia9zMS_05e-Y5xdK4eA4x1fTksaPlHC83gp8L2Fvie6RAA",
});

export const db = drizzle(client);
