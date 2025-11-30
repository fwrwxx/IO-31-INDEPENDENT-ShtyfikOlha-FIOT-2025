// Pixabay API key - Replace with your own key from https://pixabay.com/api/docs/
const API_KEY = '53466074-fbeb34bf6e3d3a20ac7ebb403';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.image-gallery');
const loader = document.querySelector('.loader');

let lightbox = null;

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const searchQuery = formData.get('searchQuery').trim();
    
    if (!searchQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Будь ласка, введіть пошуковий запит',
            position: 'topRight'
        });
        return;
    }
    
    // Clear previous results
    gallery.innerHTML = '';
    
    // Show loader
    loader.classList.add('active');
    
    // Fetch images
    fetchImages(searchQuery)
        .then(renderGallery)
        .catch(handleError)
        .finally(() => {
            loader.classList.remove('active');
        });
}

function fetchImages(query) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40
    });
    
    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            console.log("STATUS:", response.status);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        });
}

function renderGallery(data) {
    if (data.hits.length === 0) {
        iziToast.info({
            title: 'No results',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight'
        });
        return;
    }
    
    const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <li class="image-card">
                    <a href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy">
                    </a>
                    <div class="image-info">
                        <div class="image-stat">
                            <strong>${likes}</strong>
                            <span>Likes</span>
                        </div>
                        <div class="image-stat">
                            <strong>${views}</strong>
                            <span>Views</span>
                        </div>
                        <div class="image-stat">
                            <strong>${comments}</strong>
                            <span>Comments</span>
                        </div>
                        <div class="image-stat">
                            <strong>${downloads}</strong>
                            <span>Downloads</span>
                        </div>
                    </div>
                </li>
            `;
        })
        .join('');
    
    gallery.innerHTML = markup;
    
    // Initialize or refresh SimpleLightbox
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox('.image-gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    }
    
    iziToast.success({
        title: 'Success',
        message: `Знайдено ${data.hits.length} зображень`,
        position: 'topRight'
    });
}

function handleError(error) {
    console.error('Error fetching images:', error);
    iziToast.error({
        title: 'Error',
        message: 'Помилка завантаження зображень. Спробуйте пізніше.',
        position: 'topRight'
    });
}