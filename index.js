const handleSearch = async (event) => {
  event.preventDefault();

  const searchInput = document.querySelector('#search-input');
  const query = searchInput.value;

  const message = document.querySelector('#message');

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();

    if (data.length > 0) {
      let html = '';

      for (let i = 0; i < data.length; i++) {
        const show = data[i].show;
        html += `<div class="result">
                   <h2>${show.name}</h2>
                   <img src="${show.image.medium}" alt="${show.name}">
                 </div>`;
      }


      const showsContainer = document.createElement('div');
      showsContainer.id = 'shows';
      showsContainer.innerHTML = html;

      message.innerHTML = '';
      message.appendChild(showsContainer);
    } else {
      message.innerHTML = 'Not found.';
    }
  } catch (error) {
    message.innerHTML = 'Erro ao buscar informações.';
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});