import {drizzle} from 'drizzle-orm/bun-sqlite';
import {Database} from 'bun:sqlite';
import * as schema from './schema';
import {candidates} from "./schema";
import {migrate} from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, {schema, logger: true});
migrate(db, {migrationsFolder: './drizzle'});

const daltons = await db.select().from(candidates);

if (daltons.length === 0) {
    await db.insert(candidates).values({ firstName: "Joe", lastName: "Dalton"});
    await db.insert(candidates).values({ firstName: "William", lastName: "Dalton"});
}

console.log("Single table select ------------");

const resultSelect = await db.select().from(candidates).limit(1);
const resultFindMany = await db.query.candidates.findMany({limit: 1,});
const resultFindFirst = await db.query.candidates.findFirst({});

console.log("Select ------------------------") ;// Query: select "id", "firstName", "lastName" from "candidates"
console.log(resultSelect);
console.log("FindMany ----------------------"); // Query: select "id", "firstName", "lastName" from "candidates"
console.log(resultFindMany);
console.log("FindFirst ---------------------"); // Query: select "id", "firstName", "lastName" from "candidates" limit ? -- params: [1]
console.log(resultFindFirst);
