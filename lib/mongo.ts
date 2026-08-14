// MongoDB connection. Returns null when MONGODB_URI is unset so the site can
// run with no database at all — callers fall back to hardcoded content.

import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

// Dev hot-reload would otherwise open a new pool on every reload.
const g = globalThis as { _mongo?: Promise<MongoClient> };

export async function db(): Promise<Db | null> {
  if (!uri) return null;
  g._mongo ??= new MongoClient(uri).connect();
  const client = await g._mongo;
  return client.db(process.env.MONGODB_DB ?? "porto");
}
