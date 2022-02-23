import process from "process";

import { Client } from "tixte";

import "dotenv/config";

export const client = new Client(process.env.TIXTE_API_KEY!);
