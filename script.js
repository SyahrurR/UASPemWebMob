// URL untuk API
const BASE_URL = "https://api.openf1.org/v1/drivers?session_key=latest";

// Fungsi asinkron untuk mengambil data dari API
async function fetchDrivers() {
  try {
    // Mengirim permintaan GET ke API
    const response = await fetch(BASE_URL, {
      method: "GET",
    });
    // Mengubah respon menjadi format JSON
    const data = await response.json();
    console.log("Drivers:", data);
    return data;
  } catch (error) {
    // Menangani kesalahan saat mengambil data
    console.error("Error fetching drivers:", error);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}

// Menjalankan kode setelah seluruh dokumen selesai dipanggil
document.addEventListener("DOMContentLoaded", async () => {
  const driverList = document.getElementById("driver-list"); // daftar driver
  const searchInput = document.querySelector('input[type="search"]'); // input pencarian

  let drivers = await fetchDrivers(); // Mengambil data dari API

  // Fungsi untuk mendapatkan URL gambar
  const getHighQualityImageUrl = (url) => {
    return url.replace(".transform/1col/image.png", ""); // Mengganti bagian URL untuk mendapatkan gambar kualitas tinggi
  };

  // Fungsi untuk merender data ke dalam HTML
  const renderDrivers = (driversToRender) => {
    driverList.innerHTML = "";
    if (driversToRender.length > 0) {
      driversToRender.forEach((driver) => {
        const highQualityImageUrl = getHighQualityImageUrl(driver.headshot_url);
        const card = document.createElement("div"); // Membuat elemen div baru untuk kartu driver
        card.className = "col-md-4 mb-4"; // Menambahkan kelas CSS ke elemen div
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

      const images = document.querySelectorAll("img"); // Mengambil semua elemen gambar
      images.forEach((img) => {
        img.onerror = function () {
          img.src = "Error.svg"; // Mengganti gambar jika terjadi kesalahan pemuatan
        };
      });
    } else {
      driverList.innerHTML = "<p>No drivers found.</p>"; // Menampilkan pesan jika tidak ada driver ditemukan
    }
  };

  if (driverList) {
    renderDrivers(drivers); // Merender driver saat daftar driver ada
  }

  // Event listener untuk input pencarian
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase(); // Mengambil nilai input dan mengubahnya menjadi huruf kecil
    const filteredDrivers = drivers.filter(
      (driver) => driver.full_name.toLowerCase().includes(query) // Memfilter driver berdasarkan input pencarian
    );
    renderDrivers(filteredDrivers); // Merender driver yang sudah difilter
  });
});

// Fungsi untuk melihat detail driver berdasarkan nomor driver
function viewDetails(driver_number) {
  window.location.href = `details.html?driver_number=${driver_number}`; // Mengarahkan ke halaman detail driver
}
