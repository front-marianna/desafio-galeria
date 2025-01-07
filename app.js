const accessKey = "hV-FwwZcXZKSugmHEns8dNt9mUfZRaBdLJMztA-vKZ4";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-bar");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  // Check se pesquisa é valida
  if (results.length === 0) {
    // Se não houver resultados, cria a imagem "nenhuma imagem encontrada"
    const noResultsMessage = document.createElement("div");
    noResultsMessage.classList.add("no-results-message");

    const noResultsText = document.createElement("p");
    noResultsText.textContent = "Nenhuma imagem encontrada para essa pesquisa.";

    noResultsMessage.appendChild(noResultsText);
    searchResults.appendChild(noResultsMessage);
    return;
  }

  // Exibe pesquisa
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Imagem sem descrição";

    const altText = document.createElement("p");
    altText.classList.add("alt-text");
    altText.textContent = result.alt_description || "Sem descrição";

    // Imagem primeiro, texto depois
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(altText);

    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (results.length > 0) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (e) => {
  searchImages();
});
