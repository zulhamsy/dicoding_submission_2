const searchField = document.getElementById("search");
const STORAGE_KEY = "BOOKS";

function handleSearch() {
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
}

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

export default handleSearch;
