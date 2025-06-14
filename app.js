const connection = new signalR.HubConnectionBuilder()
    .withUrl("/api")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("newSensorData", (data) => {
    console.log("Data received:", data);
    // Actualizar HTML con los valores nuevos
});

connection.start().catch(err => console.error(err));
