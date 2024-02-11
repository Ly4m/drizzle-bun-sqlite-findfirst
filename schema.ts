import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const candidates = sqliteTable('candidates', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	firstName: text('firstName').notNull(),
	lastName: text('lastName').notNull(),
});

