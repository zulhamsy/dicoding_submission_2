import renderUI from "./render.js";

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
  // Render UI
  renderUI(storage);
} else {
  alert(
    "Your browser doesn't support localStorage, please change your browser",
  );
  document.body.setAttribute("hidden", true);
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
    title: JUDUL.value,
    author: PENULIS.value,
    year: +TAHUN.value,
    isComplete: IS_DONE.checked,
  };
  if (inputData.title != "" && inputData.year != "" && inputData.author != "") {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // Input to LS
    storage.push(inputData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    clearField();
    // Render UI
    renderUI(storage);
  } else {
    alert("Field Judul, Penulis dan Tahun harus diisi");
  }
});

// Ubah sudah-belum dibaca dan delete
const sectionBelum = document.getElementById("belum-dibaca");
const sectionSudah = document.getElementById("sudah-dibaca");

function handleChange(e) {
  const role = e.target.dataset.role;
  const id = +e.target.dataset.id;
  if (role == "action-change") {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const matchIndex = storage.findIndex((item) => {
      return item.id == id;
    });

    storage[matchIndex].isComplete = !storage[matchIndex].isComplete;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    renderUI(storage);
  } else if (role == "action-delete") {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const matchIndex = storage.findIndex((item) => {
      return item.id == id;
    });

    storage.splice(matchIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    renderUI(storage);
  }
}

sectionBelum.addEventListener("click", handleChange);
sectionSudah.addEventListener("click", handleChange);
