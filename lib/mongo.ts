// MongoDB connection. Returns null when MONGODB_URI is unset so the site can
// run with no database at all — callers fall back to hardcoded content.

import dns from "dns";
import { MongoClient, type Db } from "mongodb";
import { DB_CONFIG } from "@/lib/constants";

// Fix for Node.js SRV record lookup issues with certain local ISP/router DNS
try {
  dns.setServers([...DB_CONFIG.DNS_FALLBACK_SERVERS]);
} catch {}

const uri = process.env.MONGODB_URI;

// Dev hot-reload would otherwise open a new pool on every reload.
const g = globalThis as { _mongo?: Promise<MongoClient> };

export async function db(): Promise<Db | null> {
  if (!uri) return null;
  try {
    g._mongo ??= new MongoClient(uri, {
      serverSelectionTimeoutMS: DB_CONFIG.SERVER_SELECTION_TIMEOUT_MS,
      connectTimeoutMS: DB_CONFIG.CONNECTION_TIMEOUT_MS,
    }).connect();
    const client = await g._mongo;
    return client.db(process.env.MONGODB_DB ?? DB_CONFIG.DEFAULT_DATABASE_NAME);
  } catch (err) {
    console.warn("MongoDB unreachable, falling back to local content:", (err as Error).message || err);
    g._mongo = undefined;
    return null;
  }
}
