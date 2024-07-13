const BASE_URL = "https://api.openf1.org/v1/drivers?session_key=latest";

async function fetchDrivers() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
    });
    const data = await response.json();
    console.log("Drivers:", data);
    return data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const driverList = document.getElementById("driver-list");
  const searchInput = document.querySelector('input[type="search"]');

  let drivers = await fetchDrivers();

  // Function to get high-resolution image URL
  const getHighQualityImageUrl = (url) => {
    return url.replace(".transform/1col/image.png", "");
  };

  const renderDrivers = (driversToRender) => {
    driverList.innerHTML = ""; // Clear existing drivers
    if (driversToRender.length > 0) {
      driversToRender.forEach((driver) => {
        const highQualityImageUrl = getHighQualityImageUrl(driver.headshot_url);
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
          <div class="card card-container" onclick="viewDetails(${driver.driver_number})">
              <div class="position-relative">
                <img src="${highQualityImageUrl}" class="card-img-top" alt="${driver.full_name}">
                <div class="card-number">#${driver.driver_number}</div>
              </div>
              <div class="card-body">
                  <h5 class="fw-bold card-title">${driver.full_name}</h5>
                  <p class="card-text">${driver.team_name}</p>
              </div>
          </div>
        `;
        driverList.appendChild(card);
      });

      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.onerror = function () {
          img.src = "Error.svg";
        };
      });
    } else {
      driverList.innerHTML = "<p>No drivers found.</p>";
    }
  };

  if (driverList) {
    renderDrivers(drivers);
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredDrivers = drivers.filter((driver) =>
      driver.full_name.toLowerCase().includes(query)
    );
    renderDrivers(filteredDrivers);
  });
});

function viewDetails(driver_number) {
  window.location.href = `details.html?driver_number=${driver_number}`;
}
