import express, {
    NextFunction,
    Request,
    Response,
    RequestHandler,
} from "express";
import prisma from "../prisma.js";

export const getReply: RequestHandler = async (req, res, next) => {
    const replyId = parseInt(req.params.id);
    const reply = await prisma.reply.findUnique({
        where: { id: replyId },
    });

    if (!reply) {
        return next(new Error("404"));
    }

    res.json({ reply });
};

export const updateReply: RequestHandler = async (req, res) => {
    const replyId = parseInt(req.params.id);
    const reply = await prisma.reply.update({
        where: { id: replyId },
        data: req.body,
    });

    res.json({ reply });
};

export const deleteReply: RequestHandler = async (req, res) => {
    const replyId = parseInt(req.params.id);
    await prisma.reply.delete({
        where: { id: replyId },
    });

    res.sendStatus(200);
};
