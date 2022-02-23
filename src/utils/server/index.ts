/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Client } from "tixte";

export const tixteClient = new Client(process.env.TIXTE_API_KEY!);
