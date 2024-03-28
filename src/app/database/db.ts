import { Level } from "level";

const db: Level<string, string[]> = new Level("./data", {keyEncoding: 'view',
                                                 valueEncoding: 'json' });


export default db;

