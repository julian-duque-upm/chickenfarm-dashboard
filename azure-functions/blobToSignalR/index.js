module.exports = async function (context, inputBlob) {
    context.log("📥 New blob received by trigger");

    try {
        let data;

        // Si el contenido es binario o string base64, conviértelo
        if (Buffer.isBuffer(inputBlob)) {
            data = inputBlob.toString('utf8');
        } else if (typeof inputBlob === 'string') {
            data = inputBlob;
        } else {
            context.log("⚠️ Blob is not a valid string or buffer");
            return;
        }

        // Los blobs pueden contener múltiples JSONs concatenados. Vamos a intentar separar cada JSON
        const jsonEntries = data
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (err) {
                    context.log("⚠️ Error parsing JSON line:", line);
                    return null;
                }
            })
            .filter(entry => entry !== null);

        if (jsonEntries.length === 0) {
            context.log("⚠️ No valid JSON entries found in blob.");
            return;
        }

        // Enviar cada entrada como un mensaje individual
        const messages = jsonEntries.map(entry => ({
            target: 'newSensorData',
            arguments: [entry]
        }));

        context.bindings.signalRMessages = messages;

        context.log(`📡 Sent ${messages.length} messages to SignalR`);

    } catch (error) {
        context.log.error("❌ Error processing blob:", error);
    }
};
