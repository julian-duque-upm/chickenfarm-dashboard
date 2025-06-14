// Asegúrate de que en tu Azure Function (blobToSignalR) estés enviando al hub 'messages'

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/api") // Este endpoint funciona gracias a la integración automática en Azure Function App
    .configureLogging(signalR.LogLevel.Information)
    .build();

// Este es el evento que tu Azure Function debe emitir (debe coincidir con connection.send('newSensorData', ...))
connection.on("newSensorData", (data) => {
    if (!data) return;

    if (data.acceleration !== undefined) {
        document.getElementById("acceleration-value").innerText = `${data.acceleration} g`;
    }
    if (data.airQuality !== undefined) {
        document.getElementById("airquality-value").innerText = `${data.airQuality} ppm`;
    }
    if (data.light1 !== undefined) {
        document.getElementById("light1-value").innerText = `${data.light1} lux`;
    }
    if (data.light2 !== undefined) {
        document.getElementById("light2-value").innerText = `${data.light2} lux`;
    }
});

connection.start()
    .then(() => console.log("✅ Connected to Azure SignalR"))
    .catch(err => console.error("❌ SignalR connection error:", err));
