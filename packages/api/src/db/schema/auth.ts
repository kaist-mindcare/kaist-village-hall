import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  primaryKey,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core'

import { createdAt, id } from '@/db/field'

// User

export const authUser = pgTable('auth_user', {
  id,
  createdAt,
  nickname: varchar('nickname', { length: 64 }).notNull(),
})
export const authUserRelations = relations(authUser, ({ many }) => ({
  userGroups: many(authGroupToAuthUser),
  userPermissions: many(authPermissionToAuthUser),
}))

// KAIST

export const authKaist = pgTable('auth_kaist', {
  id,
  createdAt,
  uid: varchar('uid', { length: 16 }).notNull().unique(),
  nameKo: varchar('name_ko', { length: 64 }).notNull(),
  nameEn: varchar('name_en', { length: 64 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 16 }).notNull(),
  studentNumber: smallint('student_number').notNull(),
  departmentId: smallint('department_id').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => authUser.id),
})

// Group

export const authGroup = pgTable('auth_group', {
  id,
  createdAt,
  name: varchar('name', { length: 64 }).notNull(),
})
export const authGroupRelations = relations(authGroup, ({ many }) => ({
  groupUsers: many(authGroupToAuthUser),
  groupPermissions: many(authGroupToAuthPermission),
}))

// Permission

export const authPermission = pgTable('auth_permission', {
  id,
  name: varchar('name', { length: 64 }).notNull(),
  code: varchar('code', { length: 64 }).notNull(),
})
export const authPermissionRelations = relations(
  authPermission,
  ({ many }) => ({
    permissionUsers: many(authPermissionToAuthUser),
    permissioinGroups: many(authGroupToAuthPermission),
  }),
)

// Many-to-Many

export const authGroupToAuthUser = pgTable(
  'auth_group_auth_user',
  {
    groupId: integer('group_id')
      .notNull()
      .references(() => authGroup.id),
    userId: integer('user_id')
      .notNull()
      .references(() => authUser.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
)
export const authGroupToAuthUserRelations = relations(
  authGroupToAuthUser,
  ({ one }) => ({
    group: one(authGroup, {
      fields: [authGroupToAuthUser.groupId],
      references: [authGroup.id],
    }),
    user: one(authUser, {
      fields: [authGroupToAuthUser.userId],
      references: [authUser.id],
    }),
  }),
)

export const authPermissionToAuthUser = pgTable(
  'auth_permission_auth_user',
  {
    permissionId: integer('permission_id')
      .notNull()
      .references(() => authPermission.id),
    userId: integer('user_id')
      .notNull()
      .references(() => authUser.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.permissionId] }),
  }),
)
export const authPermissionToAuthUserRelations = relations(
  authPermissionToAuthUser,
  ({ one }) => ({
    permission: one(authPermission, {
      fields: [authPermissionToAuthUser.permissionId],
      references: [authPermission.id],
    }),
    user: one(authUser, {
      fields: [authPermissionToAuthUser.userId],
      references: [authUser.id],
    }),
  }),
)

export const authGroupToAuthPermission = pgTable(
  'auth_group_auth_permission',
  {
    groupId: integer('group_id')
      .notNull()
      .references(() => authGroup.id),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => authPermission.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.groupId, t.permissionId] }),
  }),
)
export const authGroupToAuthPermissionRelations = relations(
  authGroupToAuthPermission,
  ({ one }) => ({
    group: one(authGroup, {
      fields: [authGroupToAuthPermission.groupId],
      references: [authGroup.id],
    }),
    permission: one(authPermission, {
      fields: [authGroupToAuthPermission.permissionId],
      references: [authPermission.id],
    }),
  }),
)
