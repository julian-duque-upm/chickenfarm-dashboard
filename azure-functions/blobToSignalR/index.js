const signalRMessage = {
    target: 'newSensorData',
    arguments: [parsedSensorData]
};

context.bindings.signalRMessages = [ signalRMessage ];
