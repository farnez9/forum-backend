import prisma from "../prisma.js";
const getMany = async () => {
    return await prisma.user.findMany();
};
const get = async (id) => {
    return await prisma.user.findFirst({
        where: { id },
        include: {
            posts: true,
        },
    });
};
export default { getMany, get };
