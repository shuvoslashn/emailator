import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        credits: v.number(),
    }),

    files: defineTable({
        storageId: v.id("_storage"),
        fileName: v.string(),
        userId: v.id("users"),
        fileType: v.string(),
    }),

    emailTemplates: defineTable({
        tid: v.string(),
        design: v.any(),
        email: v.string(),
    }),
});
