import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const personas = pgTable('personas', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 256 }),
    userName: varchar('user_name', { length: 256 }),
    src: varchar('src', { length: 256 }),
    name: text('name'),
    description: text('description'),
    context: text('context'),
    seed: text('seed'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    categoryId: varchar('category_id', { length: 256 }).references(() => categories.id),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
});

export const roles = pgEnum('role', ['user', 'system']);

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    role: roles('role'),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    personaId: varchar('persona_id', { length: 256 }),
    userId: varchar('user_id', { length: 256 }),
});

export const userSubscriptions = pgTable('user_subscriptions', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 256 }).unique(),
    stripeCustomerId: varchar('stripe_customer_id', { length: 256 }).unique(),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 256 }).unique(),
    stripePriceId: varchar('stripe_price_id', { length: 256 }),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
});