// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
}

// hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// click di luar hamburger
window.addEventListener('click',  function (e) {
    if(e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function() {
    if(darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

// pindahkan posisi toggle sesuai mode 
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkToggle.checked = true;
  } else {
    darkToggle.checked = false;
  }

// fetch
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {

    const inputKeyword = document.querySelector('.input-keyword')
    fetch('http://www.omdbapi.com/?apikey=7a91537c&s=' + inputKeyword.value)
    .then(response => response.json())
    .then(response => {
        const movies = response.Search;
        let cards = '';
        movies.forEach(m => cards += showCards(m));
        const movieContainer = document.querySelector('.movie-card');
        movieContainer.innerHTML = cards;

        // ketika tombol detail di click
        const modalDetailButton = document.querySelectorAll('.modal-detail-button');
        modalDetailButton.forEach(btn => {
            btn.addEventListener('click', function() {
                const imdbid = this.dataset.imdbid;
                console.log(imdbid);
                fetch('http://www.omdbapi.com/?apikey=7a91537c&i=' + imdbid)
                .then(response => response.json())
                .then(m => {
                    const movieDetail = showMovieDetail(m);
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = movieDetail;
                });
            });
        });
    });
});


function showCards(m) {
    return `<div class="w-full px-4 lg:w-1/2 xl:w-1/3 ">
                <div class="movie-card bg-white rounded-xl shadow-lg overflow-hidden mb-10 dark:bg-slate-700">
                    <img src="${m.Poster}" alt="movie" class="w-full">
                        <div class="py-8 px-6">
                            <h3><label for="tw-modal" class="modal-detail-button block dark:text-white mb-3 font-semibold text-xl text-dark hover:text-primary truncate" data-imdbid="${m.imdbID}">${m.Title}</label></h3>
                                <p class="mb-6 dark:text-white">${m.Year}</p>
                                <label for="tw-modal" class="modal-detail-button cursor-pointer font-medium text-sm bg-primary text-white py-2 px-4 rounded-lg" data-imdbid="${m.imdbID}">Lihat Selengkapnya</label>
                        </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
    return `<label id="tw-modal" class="dark:bg-slate-700 max-h-[calc(100vh - 5em)] max-w-lg scale-90 overflow-y-auto overscroll-contain rounded-md bg-white p-6 text-black
    shadow-2xl transition">
            <div>
                <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <img src="${m.Poster}" class="w-full" alt="movie">
                    <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">${m.Title}</dd>
                    </div>
                    <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">Director</dt>
                    <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">${m.Director}</dd>
                    </div>
                    <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">Actors</dt>
                    <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">${m.Actors}</dd>
                    </div>
                    <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">Writer</dt>
                    <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">${m.Writer}</dd>
                    </div>
                    <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">Plot</dt>
                    <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">${m.Plot}</dd>
                    <button id="closeButton" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none">
                    Close
                    </button>

                    </div>
                </dl>
                </div>
            </div>
        </label>`;
}



  