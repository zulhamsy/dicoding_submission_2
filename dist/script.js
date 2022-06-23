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
  renderUI();
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

function renderUI() {
  // Check storage first
  if (!storage) {
    storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  // Check if storage have any item
  if (!storage.length) {
    return;
  }
  // Render UI
  const belumContainer = document.getElementById("belum-card-container");
  belumContainer.innerHTML = "";
  storage.forEach((book) => {
    if (!book.isComplete) {
      const card = addToBelumDibaca(book);
      belumContainer.appendChild(card);
    }
  });
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
    renderUI();
  } else {
    alert("Field Judul, Penulis dan Tahun harus diisi");
  }
});

// Belum Card
function addToBelumDibaca(data) {
  const result = document.createElement("div");
  result.setAttribute("data-id", data.id);
  result.className =
    "shadow-md py-2 px-3 rounded flex justify-between items-center";
  result.innerHTML = `
  <!-- Book Detail -->
    <div>
      <!-- Book Title -->
      <p class="font-semibold">${data.judul}</p>
      <!-- Author -->
      <p class="text-sm text-slate-600 font-medium">${data.penulis}</p>
      <!-- Year -->
      <p class="text-sm text-slate-500">${data.tahun}</p>
    </div>
    <!-- Book Action -->
    <div class="flex gap-3">
      <!-- Delete -->
      <button class="p-2 group" title="Hapus buku"><svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 fill-slate-300 group-hover:fill-red-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg></button>
      <button class="p-2 group rounded-full hover:bg-violet-500" title="Tandai sudah dibaca"><svg
          xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-slate-600 group-hover:fill-white"
          viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg></button>
    </div>
  `;
  return result;
}
