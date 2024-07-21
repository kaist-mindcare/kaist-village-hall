import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  primaryKey,
  text,
  varchar,
} from 'drizzle-orm/pg-core'

import { createdAt, id } from '@/db/field'
import { authUser } from '@/db/schema/auth'

// Post

export const villagePost = pgTable('village_post', {
  id,
  createdAt,
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => authUser.id),
})
export const villagePostRelations = relations(villagePost, ({ many, one }) => ({
  author: one(authUser, {
    fields: [villagePost.authorId],
    references: [authUser.id],
  }),
  comments: many(villagePostComment),
  postTags: many(villagePostToVillagePostTag),
  postLikes: many(villagePostLike),
}))

// Comment

export const villagePostComment = pgTable('village_post_comment', {
  id,
  createdAt,
  content: text('content').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => authUser.id),
  postId: integer('post_id')
    .notNull()
    .references(() => villagePost.id),
})
export const villagePostCommentRelations = relations(
  villagePostComment,
  ({ one }) => ({
    author: one(authUser, {
      fields: [villagePostComment.authorId],
      references: [authUser.id],
    }),
    post: one(villagePost, {
      fields: [villagePostComment.postId],
      references: [villagePost.id],
    }),
  }),
)

// Tag

export const villagePostTag = pgTable('village_post_tag', {
  id,
  createdAt,
  name: varchar('name', { length: 32 }).notNull(),
})
export const villagePostTagRelations = relations(
  villagePostTag,
  ({ many }) => ({
    tagPosts: many(villagePostToVillagePostTag),
  }),
)

// Like

export const villagePostLike = pgTable(
  'village_post_like',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => authUser.id),
    postId: integer('post_id')
      .notNull()
      .references(() => villagePost.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.postId] }),
  }),
)
export const villagePostLikeRelations = relations(
  villagePostLike,
  ({ one }) => ({
    user: one(authUser, {
      fields: [villagePostLike.userId],
      references: [authUser.id],
    }),
    post: one(villagePost, {
      fields: [villagePostLike.postId],
      references: [villagePost.id],
    }),
  }),
)

// Many-to-Many

export const villagePostToVillagePostTag = pgTable(
  'village_post_village_post_tag',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => villagePost.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => villagePostTag.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagId] }),
  }),
)
export const villagePostToVillagePostTagRelations = relations(
  villagePostToVillagePostTag,
  ({ one }) => ({
    post: one(villagePost, {
      fields: [villagePostToVillagePostTag.postId],
      references: [villagePost.id],
    }),
    tag: one(villagePostTag, {
      fields: [villagePostToVillagePostTag.tagId],
      references: [villagePostTag.id],
    }),
  }),
)
