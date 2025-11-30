const API_KEY = '53466074-fbeb34bf6e3d3a20ac7ebb403';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let lightbox = null;

// Quick search buttons
const quickSearchButtons = [
    { label: '🌸 Квіти', value: 'flowers' },
    { label: '🏔️ Гори', value: 'mountains' },
    { label: '🌊 Океан', value: 'ocean' },
    { label: '🌆 Місто', value: 'city' },
    { label: '🐱 Кішки', value: 'cats' },
];

// Create quick search section
function createQuickSearchButtons() {
    const quickSearchContainer = document.createElement('div');
    quickSearchContainer.className = 'quick-search';
    quickSearchContainer.innerHTML = `
        <span class="quick-search-label">Швидкий пошук:</span>
        ${quickSearchButtons.map(btn => `
            <button type="button" class="quick-search-btn" data-query="${btn.value}">
                ${btn.label}
            </button>
        `).join('')}
    `;
    
    searchForm.parentNode.insertBefore(quickSearchContainer, searchForm.nextSibling);
    
    // Add event listeners to quick search buttons
    document.querySelectorAll('.quick-search-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            searchInput.value = query;
            searchImages(query);
        });
    });
}

// Initialize quick search buttons on page load
createQuickSearchButtons();

// Search form submit handler
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const query = searchInput.value.trim();
    
    if (!query) {
        iziToast.warning({
            title: 'Увага',
            message: 'Будь ласка, введіть пошуковий запит',
            position: 'topRight'
        });
        return;
    }
    
    await searchImages(query);
});

// Search images function
async function searchImages(query) {
    gallery.innerHTML = '';
    loader.style.display = 'flex';

    searchInput.disabled = true;
    document.querySelectorAll('.quick-search-btn').forEach(btn => btn.disabled = true);

    try {
        const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=40`;

        const response = await fetch(url);

        console.log("STATUS:", response.status); // ← допоможе зрозуміти реальну помилку

        if (!response.ok) {
            if (response.status === 400) throw new Error("API KEY неправильний або пошкоджений.");
            if (response.status === 403) throw new Error("Доступ заборонено. KEY заблокований або неправильний origin.");
            if (response.status === 429) throw new Error("Перевищено ліміт. Спробуй через 1 хв.");
            throw new Error(`Помилка API: ${response.status}`);
        }

        const data = await response.json();

        loader.style.display = 'none';
        searchInput.disabled = false;
        document.querySelectorAll('.quick-search-btn').forEach(btn => btn.disabled = false);

        if (!data.hits || data.hits.length === 0) {
            iziToast.info({
                title: "Нема результатів",
                message: "Спробуйте інший запит.",
                position: "topRight"
            });
            return;
        }

        iziToast.success({
            title: "Готово",
            message: `Знайдено ${data.hits.length} фото`,
            position: "topRight"
        });

        renderGallery(data.hits);

        if (lightbox) lightbox.refresh();
        else {
            lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250
            });
        }

    } catch (error) {
        loader.style.display = 'none';
        searchInput.disabled = false;
        document.querySelectorAll('.quick-search-btn').forEach(btn => btn.disabled = false);

        iziToast.error({
            title: "Помилка",
            message: error.message,
            position: "topRight"
        });

        console.error(error);
    }
}


// Render gallery function
function renderGallery(images) {
    const markup = images.map(image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <div class="gallery-image-wrapper">
                    <img 
                        src="${image.webformatURL}" 
                        alt="${image.tags}" 
                        class="gallery-image"
                        loading="lazy"
                    />
                </div>
                <div class="gallery-overlay">
                    <p class="gallery-tags">${image.tags}</p>
                    <div class="gallery-stats">
                        <div class="stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            <span>${image.likes}</span>
                        </div>
                        <div class="stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <span>${image.views}</span>
                        </div>
                        <div class="stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            <span>${image.comments}</span>
                        </div>
                        <div class="stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            <span>${image.downloads}</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    `).join('');
    
    gallery.innerHTML = markup;
}
