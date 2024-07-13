const API_URL = "https://api.openf1.org/v1/drivers?session_key=latest";

async function fetchDriverDetails(driverNumber) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const driver = data.find((d) => d.driver_number == driverNumber);

    if (driver) {
      document.getElementById("driver-image").src = driver.headshot_url.replace(
        ".transform/1col/image.png",
        ""
      ); // Replace to high-quality image
      document.getElementById("driver-name").textContent = driver.full_name;
      document.getElementById("driver-full-name").textContent =
        driver.full_name;
      document.getElementById("driver-number").textContent =
        driver.driver_number;
      document.getElementById("driver-team").textContent = driver.team_name;
      document.getElementById("driver-country").textContent =
        driver.country_code;
    } else {
      console.error("Driver not found");
    }
  } catch (error) {
    console.error("Error fetching driver details:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const driverNumber = urlParams.get("driver_number");
  if (driverNumber) {
    fetchDriverDetails(driverNumber);
  }
});
