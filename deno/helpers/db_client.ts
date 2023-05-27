import {
  MongoClient,
  Database,
} from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

let db: Database;

export async function connect() {
  const client = new MongoClient();

  db = await client.connect('mongodb://127.0.0.1:27017/todos');
}

export function getDb() {
  return db;
}
