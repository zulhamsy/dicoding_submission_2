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

// Search books
const searchField = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function (e) {
  const searchContainer = document.getElementById("search-container");

  if (searchField.value != "") {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const pattern = new RegExp(searchField.value, "i");
    const result = storage.filter((item) => {
      return pattern.test(item.title);
    });

    if (result.length) {
      searchContainer.innerHTML = "";
      result.forEach((item) => {
        // console.log(item);
        const card = searchResultCard(item);
        searchContainer.appendChild(card);
      });
    } else {
      searchContainer.innerHTML = `
      <p class="text-center mt-7 text-slate-500">Tidak ditemukan buku dengan keyword "<span
      class="font-semibold">${searchField.value}</span>"</p>
      `;
    }
  } else {
    searchContainer.innerHTML = "";
  }
});

function searchResultCard(data) {
  const result = document.createElement("div");
  result.className =
    "shadow py-2 px-3 rounded flex justify-between items-center";
  let pillCard;
  if (data.isComplete) {
    pillCard = `
    <div class="text-sm font-semibold bg-emerald-100 text-emerald-500 px-4 py-2 rounded-full">
      Sudah dibaca
    </div>
    `;
  } else {
    pillCard = `
    <div class="text-sm font-semibold bg-slate-200 text-slate-500 px-4 py-2 rounded-full">
      Belum dibaca
    </div>
    `;
  }

  result.innerHTML = `
  <!-- Book Detail -->
  <div>
    <!-- Book Title -->
    <p class="font-semibold">${data.title}</p>
    <!-- Author -->
    <p class="text-sm text-slate-600 font-medium">${data.author}</p>
    <!-- Year -->
    <p class="text-sm text-slate-500">${data.year}</p>
  </div>
  <!-- Book Info -->
  ${pillCard}
  `;

  return result;
}
