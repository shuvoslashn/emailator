import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const saveFile = mutation({
    args: {
        storageId: v.id("_storage"),
        fileName: v.string(),
        fileType: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        // Save file metadata in the database
        const fileId = await ctx.db.insert("files", {
            storageId: args.storageId,
            fileName: args.fileName,
            fileType: args.fileType,
            userId: user._id,
        });

        // Generate the file URL
        const fileUrl = await ctx.storage.getUrl(args.storageId);

        return { fileId, fileUrl }; // Return both fileId and fileUrl
    },
});
