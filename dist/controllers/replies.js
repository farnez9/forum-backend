import prisma from "../prisma.js";
export const getReply = async (req, res, next) => {
    const replyId = parseInt(req.params.id);
    const reply = await prisma.reply.findUnique({
        where: { id: replyId },
    });
    if (!reply) {
        return next(new Error("404"));
    }
    res.json({ reply });
};
export const updateReply = async (req, res) => {
    const replyId = parseInt(req.params.id);
    const reply = await prisma.reply.update({
        where: { id: replyId },
        data: req.body,
    });
    res.json({ reply });
};
export const deleteReply = async (req, res) => {
    const replyId = parseInt(req.params.id);
    await prisma.reply.delete({
        where: { id: replyId },
    });
    res.sendStatus(200);
};
