import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { loadEnv } from "../config/env.js";

const require = createRequire(import.meta.url);
const { DatabaseSync } = require("node:sqlite") as typeof import("node:sqlite");

export type Db = InstanceType<typeof DatabaseSync>;

export function openDatabase(sqlitePath = loadEnv().sqlitePath): Db {
  if (sqlitePath !== ":memory:") {
    fs.mkdirSync(path.dirname(sqlitePath), { recursive: true });
  }

  const db = new DatabaseSync(sqlitePath);
  db.exec("PRAGMA foreign_keys = ON");
  if (sqlitePath !== ":memory:") db.exec("PRAGMA journal_mode = WAL");
  return db;
}
