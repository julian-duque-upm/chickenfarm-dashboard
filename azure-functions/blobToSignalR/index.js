module.exports = async function (context, inputBlob) {
  const data = JSON.parse(inputBlob);

  context.bindings.signalRMessages = [{
    target: 'newSensorData',
    arguments: [data]
  }];
};
