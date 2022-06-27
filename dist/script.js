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

function renderUI(storage) {
  const belumContainer = document.getElementById("belum-card-container");
  const sudahContainer = document.getElementById("sudah-card-container");
  if (storage.length) {
    // Render UI
    belumContainer.innerHTML = "";
    sudahContainer.innerHTML = "";
    storage.forEach((book) => {
      if (!book.isComplete) {
        const card = addToBelumDibaca(book);
        belumContainer.appendChild(card);
      } else if (book.isComplete) {
        const card = addToSudahDibaca(book);
        sudahContainer.appendChild(card);
      }
    });
  } else {
    belumContainer.innerHTML = "";
    sudahContainer.innerHTML = "";
  }
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

// Ubah sudah-belum dibaca
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
      <p class="font-semibold">${data.title}</p>
      <!-- Author -->
      <p class="text-sm text-slate-600 font-medium">${data.author}</p>
      <!-- Year -->
      <p class="text-sm text-slate-500">${data.year}</p>
    </div>
    <!-- Book Action -->
    <div class="flex gap-3">
      <!-- Delete -->
      <button data-role="action-delete" data-id="${data.id}" class="p-2 group" title="Hapus buku"><svg data-role="action-delete" data-id="${data.id}" xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 fill-slate-300 group-hover:fill-red-600" viewBox="0 0 20 20" fill="currentColor">
          <path data-role="action-delete" data-id="${data.id}" fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg></button>
      <button data-role="action-change" data-id="${data.id}" class="p-2 group rounded-full hover:bg-violet-500" title="Tandai sudah dibaca"><svg data-role="action-change" data-id="${data.id}"
          xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-slate-600 group-hover:fill-white"
          viewBox="0 0 20 20" fill="currentColor">
          <path data-role="action-change" data-id="${data.id}" fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg></button>
    </div>
  `;
  return result;
}

// Sudah Card
function addToSudahDibaca(data) {
  const result = document.createElement("div");
  result.setAttribute("data-id", data.id);
  result.className =
    "border border-slate-200/90 py-2 px-3 rounded flex justify-between items-center";
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
  <!-- Book Action -->
  <div class="flex gap-3">
    <!-- Delete -->
    <button data-role="action-delete" data-id="${data.id}" class="p-2 group" title="Hapus buku"><svg data-role="action-delete" data-id="${data.id}" xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 fill-slate-300 group-hover:fill-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path data-role="action-delete" data-id="${data.id}" fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg></button>
    <button data-role="action-change" data-id="${data.id}" class="p-2 group rounded-full hover:bg-slate-500" title="Tandai belum dibaca">
      <svg data-role="action-change" data-id="${data.id}" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-slate-600 group-hover:fill-white"
        viewBox="0 0 20 20" fill="currentColor">
        <path data-role="action-change" data-id="${data.id}" fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg></button>
  </div>
    `;
  return result;
}
