const videosContainer = document.querySelector('.videos__container');

async function searchShowVideos() {
    try {
        const search = await fetch("http://localhost:3000/videos");
        const videos = await search.json();

        videos.forEach((video) => {
            videosContainer.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="description-video">
                <img class="img-channel" src="${video.imagem}" alt="logo do canal" />
                <h3 class="title-video">${video.titulo}</h3>
                <p class="title-channel">${video.descricao}</p>
                <p class="category" hidden>${video.categoria}</p>
            </div>
        </li> 
        `;
        })
    } catch (error) {
        videosContainer.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

searchShowVideos();

const searchBar = document.querySelector(".search__input");

searchBar.addEventListener("input", searchFilter);

function searchFilter() {
    const videos = document.querySelectorAll(".videos__item");
    const filteValue = searchBar.value.toLocaleLowerCase();

videos.forEach(video => {
    const title = video.querySelector('.titulo-video').textContent.toLocaleLowerCase();

    video.style.display = filteValue ? title.includes(filteValue) ? 'block' : 'none' : 'block';
})}

const categoryBtn = document.querySelectorAll(".upper__item");

categoryBtn.forEach(btn => {
    let categoryName = btn.getAttribute("name");
    btn.addEventListener("click", () => filterByCategory(categoryName));
})

function filterByCategory(filter) {
    const videos = document.querySelectorAll(".videos__item");

    for(let video of videos) {
        let category = video.querySelector(".category").textContent.toLowerCase();
        let filterValue = filter.toLowerCase();

        if(!category.includes(filterValue) && filterValue != 'tudo') {
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}