module.exports = function(handler) {
    return async (req, req, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    }
}