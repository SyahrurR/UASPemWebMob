// URL untuk API
const API_URL = "https://api.openf1.org/v1/drivers?session_key=latest";

// Fungsi asinkron untuk mengambil detail driver berdasarkan nomor driver
async function fetchDriverDetails(driverNumber) {
  try {
    // Mengirim permintaan GET ke API
    const response = await fetch(API_URL);
    // Mengubah respon menjadi format JSON
    const data = await response.json();
    // Mencari driver yang sesuai dengan nomor driver
    const driver = data.find((d) => d.driver_number == driverNumber);

    if (driver) {
      // Mengupdate elemen gambar dengan URL gambar resolusi tinggi
      document.getElementById("driver-image").src = driver.headshot_url.replace(
        ".transform/1col/image.png",
        ""
      ); // Mengganti dengan gambar kualitas tinggi
      // Mengupdate elemen teks dengan informasi driver
      document.getElementById("driver-name").textContent = driver.full_name;
      document.getElementById("driver-full-name").textContent =
        driver.full_name;
      document.getElementById("driver-number").textContent =
        driver.driver_number;
      document.getElementById("driver-team").textContent = driver.team_name;
      document.getElementById("driver-country").textContent =
        driver.country_code;
    } else {
      console.error("Driver not found"); // Menangani jika driver tidak ditemukan
    }
  } catch (error) {
    console.error("Error fetching driver details:", error); // Menangani kesalahan saat pengambilan data
  }
}

// Menjalankan kode setelah seluruh dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const driverNumber = urlParams.get("driver_number"); // Memanggil fungsi untuk mengambil detail driver
  if (driverNumber) {
    fetchDriverDetails(driverNumber);
  }
});
