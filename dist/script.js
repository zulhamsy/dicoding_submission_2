const STORAGE_KEY = "BOOKS";
let storage = [];

// Initialize
window.addEventListener("DOMContentLoaded", clearField);

// Check browser support localStorage
if (Storage !== null) {
  // Set jika key tidak tersedia
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
} else {
  alert(
    "Your browser doesn't support localStorage, please change your browser",
  );
}

// Input New Data to LS
const JUDUL = document.getElementById("judul");
const PENULIS = document.getElementById("penulis");
const TAHUN = document.getElementById("tahun");
const IS_DONE = document.getElementById("done");
const SUBMIT = document.querySelector('[type="submit"]');

function clearField() {
  JUDUL.value = "";
  PENULIS.value = "";
  TAHUN.value = "";
  IS_DONE.checked = false;
}

SUBMIT.addEventListener("click", function (e) {
  let inputData = {
    id: +new Date(),
    judul: JUDUL.value,
    penulis: PENULIS.value,
    tahun: TAHUN.value,
    isComplete: IS_DONE.checked,
  };
  if (
    inputData.judul != "" &&
    inputData.tahun != "" &&
    inputData.penulis != ""
  ) {
    // Input to LS
    storage.push(inputData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    clearField();
    // Render UI
  } else {
    alert("Field Judul, Penulis dan Tahun harus diisi");
  }
});
