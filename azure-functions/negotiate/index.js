module.exports = async function (context, req, connectionInfo) {
    context.log("🔌 Negotiate endpoint hit");

    context.res = {
        body: connectionInfo
    };
};
