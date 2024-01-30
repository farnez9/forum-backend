import { RequestHandler } from "express";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const login: RequestHandler = async (req, res) => {
    const { username } = req.body;

    const user = await prisma.user.findFirst({
        where: { username },
        include: {
            password: true,
        },
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid username" });
    }

    if (!user.password?.hash) {
        return res
            .status(401)
            .json({ message: "Error with username or password" });
    }

    const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password.hash
    );

    if (!passwordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, roles: user.roles },
        JWT_SECRET,
        {
            expiresIn: "6h",
        }
    );

    res.json({ token });
};

export const register: RequestHandler = async (req, res) => {
    console.log("register fn");
    console.log("register fn body", req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    console.log(hashedPassword);

    const user = await prisma.user.create({
        data: {
            ...req.body,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });

    res.status(201).json({ user });
};
