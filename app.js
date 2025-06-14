let pollingInterval = null;
const POLLING_TIME = 30000; // 30 seconds

const autoToggle = document.getElementById("auto-toggle");
const manualToggle = document.getElementById("manual-toggle");
const fetchButton = document.getElementById("fetch-button");

async function fetchSensorData() {
  const url = "https://<your-storage-account>.blob.core.windows.net/chickencontainer/ChickenFarmMadrid/2025/06/13/11/10.json?<your-SAS-token>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("acceleration-value").textContent = `${data.acceleration?.toFixed(2) ?? "--"} g`;
    document.getElementById("airquality-value").textContent = `${data.airQuality ?? "--"} ppm`;
    document.getElementById("light1-value").textContent = `${data.lightSensor1 ?? "--"} lux`;
    document.getElementById("light2-value").textContent = `${data.lightSensor2 ?? "--"} lux`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Handle Auto Update toggle
autoToggle.addEventListener("change", () => {
  if (autoToggle.checked) {
    manualToggle.checked = false;
    fetchButton.disabled = true;
    pollingInterval = setInterval(fetchSensorData, POLLING_TIME);
    fetchSensorData(); // Fetch immediately
  } else {
    clearInterval(pollingInterval);
  }
});

// Handle Manual Update toggle
manualToggle.addEventListener("change", () => {
  if (manualToggle.checked) {
    autoToggle.checked = false;
    clearInterval(pollingInterval);
    fetchButton.disabled = false;
  } else {
    fetchButton.disabled = true;
  }
});

// Manual fetch button
fetchButton.addEventListener("click", fetchSensorData);
