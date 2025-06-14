const connection = new signalR.HubConnectionBuilder()
  .withUrl("/api")
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.on("newSensorData", (data) => {
  document.getElementById("acceleration-value").textContent = `${data.acceleration} g`;
  document.getElementById("airquality-value").textContent = `${data.airQuality} ppm`;
  document.getElementById("light1-value").textContent = `${data.light1} lux`;
  document.getElementById("light2-value").textContent = `${data.light2} lux`;
});

connection.start().catch(err => console.error("SignalR Connection Error: ", err));
//test
