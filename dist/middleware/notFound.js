const notFound = (req, res) => {
    return res
        .status(404)
        .json({ error: "Route not found, check your request URL" });
};
export default notFound;
