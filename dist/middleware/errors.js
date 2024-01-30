export class ValidationError extends Error {
    validationErrors;
    constructor(validationErrors) {
        super("Validation Error");
        this.validationErrors = validationErrors;
        this.name = this.constructor.name;
    }
}
const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(400).json({ errors: err.validationErrors });
    }
    if (err.message === "404" || err.code === "P2025") {
        return res.status(404).json({ error: "Resource not found " });
    }
    console.log("Error message", err.message);
    console.log("Error code", err.code);
    console.log("Error stack", err.stack);
    next(err);
};
export default { errorHandler };
