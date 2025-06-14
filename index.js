module.exports = async function (context, myBlob) {
    const blobContent = myBlob.toString();
    let parsedData;

    try {
        parsedData = JSON.parse(blobContent);
    } catch (err) {
        context.log("Invalid JSON in blob");
        return;
    }

    context.log("Sending data to SignalR:", parsedData);

    context.bindings.signalRMessages = [{
        target: "newSensorData",
        arguments: [parsedData]
    }];
};
