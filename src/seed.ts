import prisma from "./prisma.js";
import bcrypt from "bcrypt";

const password = await bcrypt.hash("admin369!", 10);

await prisma.user.create({
    data: {
        name: "admin",
        username: "admin",
        email: "admin@admin.com",
        password: {
            create: {
                hash: password,
            },
        },
        roles: ["ADMIN"],
    },
});
