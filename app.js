document.addEventListener("DOMContentLoaded", async () => {
    try {
        const negotiateResponse = await fetch("/api/negotiate", { method: "POST" });
        const negotiateInfo = await negotiateResponse.json();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(negotiateInfo.url, {
                accessTokenFactory: () => negotiateInfo.accessToken
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("newSensorData", (data) => {
            console.log("📡 Data received:", data);

            if (data.acceleration !== undefined) {
                document.getElementById("acceleration").textContent = data.acceleration;
            }
            if (data.airQuality !== undefined) {
                document.getElementById("airQuality").textContent = data.airQuality;
            }
            if (data.light1 !== undefined) {
                document.getElementById("light1").textContent = data.light1;
            }
            if (data.light2 !== undefined) {
                document.getElementById("light2").textContent = data.light2;
            }
        });

        await connection.start();
        console.log("✅ Connected to SignalR hub.");
    } catch (err) {
        console.error("❌ Error during connection setup:", err);
        document.getElementById("status").textContent = "Error de conexión con SignalR.";
    }
});
