import prisma from "../prisma.js";
export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
};
export const getUser = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        return next(new Error("404"));
    }
    res.send({ user });
};
export const updateUser = async (req, res) => {
    const userId = req.user.id;
    delete req.body.roles;
    const user = await prisma.user.update({
        where: { id: userId },
        data: req.body,
    });
    res.json({ user });
};
export const deleteUser = async (req, res) => {
    const userId = req.user.id;
    const result = await prisma.user.delete({
        where: { id: userId },
    });
    res.sendStatus(200);
};
export const adminDeleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const result = await prisma.user.delete({
        where: { id: userId },
    });
    res.sendStatus(200);
};
export const getUserPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            posts: true,
        },
    });
    if (!user) {
        return next(new Error("404"));
    }
    res.send({ posts: user.posts });
};
export const getUserLikedPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            postsLiked: true,
        },
    });
    if (!user) {
        return next(new Error("404"));
    }
    res.send({ posts: user.postsLiked });
};
export const getUserFollowedPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            postsFollowed: true,
        },
    });
    if (!user) {
        return next(new Error("404"));
    }
    res.send({ posts: user.postsFollowed });
};
