import { z } from "zod";
import { NotificationSettings, Roles } from "@prisma/client";
const PostLazy = z.lazy(() => Post);
const ReplyLazy = z.lazy(() => Reply);
const UserLazy = z.lazy(() => User);
export const User = z.object({
    id: z.number().int().nonnegative().optional(),
    email: z.string().email(),
    name: z.string().max(50, "at most 50 chars"),
    username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
    password: z.string(),
    verified: z.boolean().optional(),
    notificationSettings: z.nativeEnum(NotificationSettings).array().optional(),
    roles: z.nativeEnum(Roles).array().optional(),
    posts: z.array(PostLazy).optional(),
    postsLiked: z.array(PostLazy).optional(),
    postReplies: z.array(ReplyLazy).optional(),
});
function containsNumbers(value) {
    return /\d/.test(value);
}
function containsSpecial(value) {
    return /[!@#$%^&*()_+/-=\[\]{};':"\\|,.<>\/?]+/.test(value);
}
export const Account = User.pick({
    name: true,
    username: true,
    email: true,
})
    .extend({
    password: z
        .string()
        .min(8, "at least 8 chars")
        .refine(containsNumbers, "Must contain at least 1 number")
        .refine(containsSpecial, "Must contain a special character"),
})
    .strict();
export const Login = User.pick({
    username: true,
    password: true,
}).strict();
export const UserUpdate = User.partial().omit({ roles: true }).strict();
export const Post = z.object({
    id: z.number().int().nonnegative().optional(),
    title: z.string().min(10),
    body: z.string().min(10),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    userId: z.number().int().nonnegative().optional(),
    published: z.boolean().default(true),
    tags: z.string().array().optional(),
    likes: z.array(UserLazy).optional(),
    author: UserLazy.optional(),
    replies: z.array(ReplyLazy).optional(),
});
export const PostUpdate = Post.pick({
    body: true,
    title: true,
    tags: true,
    published: true,
}).strict();
export const Reply = z.object({
    id: z.number().int().nonnegative().optional(),
    userId: z.number().int().nonnegative().optional(),
    postId: z.number().int().nonnegative(),
    body: z.string().min(1),
    createdAt: z.date().optional(),
    udpatedAt: z.date().optional(),
    author: UserLazy.optional(),
    post: PostLazy.optional(),
});
