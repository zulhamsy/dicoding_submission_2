import renderUI from "./render.js";
import handleSearch from "./search.js";

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
    // set notif
    setNotif(inputData.title);
    // Render UI
    renderUI(storage);
  } else {
    alert("Field Judul, Penulis dan Tahun harus diisi");
  }
});

function setNotif(title) {
  const notifContainer = document.getElementById("notif");
  const message = `
    <p class="text-emerald-600">Buku <span class="font-semibold">${title}</span> berhasil ditambahkan</p>
  `;
  notifContainer.innerHTML = message;
  // Set to show
  notifContainer.classList.toggle("hidden");
  // Set to hidden after 1200ms
  const timer = setTimeout(function () {
    notifContainer.classList.toggle("hidden");
    clearTimeout(timer);
  }, 1200);
}

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

// Search books
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", handleSearch);
