module.exports = async function (context, req) {
  const connectionInfo = await context.bindings.signalRConnectionInfo;
  context.res = {
    body: connectionInfo
  };
};
