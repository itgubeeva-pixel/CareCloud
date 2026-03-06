// Данные будут загружаться из JSON файла
let articlesData = [];
let videosData = [];

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupSmoothScrolling();
    setupFilterButtons();
});

// Загрузка данных из JSON
async function loadData() {
    try {
        const response = await fetch('web/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        articlesData = data.articles;
        videosData = data.videos;

        displayArticles('all');
        displayVideos('all');
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showError('articles-container');
        showError('videos-container');
    }
}

// Отображение статей с фильтром
function displayArticles(filter = 'all') {
    const container = document.getElementById('articles-container');

    if (!articlesData || articlesData.length === 0) {
        container.innerHTML = '<div class="loading">Нет статей для отображения</div>';
        return;
    }

    const filteredArticles = filter === 'all'
        ? articlesData
        : articlesData.filter(article => article.category === filter);

    container.innerHTML = filteredArticles.map(article => createArticleCard(article)).join('');
}

// Отображение видео с фильтром
function displayVideos(filter = 'all') {
    const container = document.getElementById('videos-container');

    if (!videosData || videosData.length === 0) {
        container.innerHTML = '<div class="loading">Нет видео для отображения</div>';
        return;
    }

    const filteredVideos = filter === 'all'
        ? videosData
        : videosData.filter(video => video.category === filter);

    container.innerHTML = filteredVideos.map(video => createVideoCard(video)).join('');
}

// Создание карточки статьи
function createArticleCard(article) {
    return `
        <div class="article-card" data-category="${article.category}">
            <div class="article-image" style="background-image: url('${article.image}')">
                <span class="article-category">${article.category}</span>
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <div class="article-meta">
                    <span>${article.readTime} чтения</span>
                    <span>${article.date}</span>
                </div>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" onclick="openArticle(${article.id})">
                    Читать статью <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// Создание карточки видео
function createVideoCard(video) {
    return `
        <div class="video-card" data-category="${video.category}">
            <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')">
                <span class="article-category">${video.category}</span>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-content">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span>${video.views} просмотров</span>
                </div>
                <p class="video-description">${video.description}</p>
                <a href="#" class="watch-btn" onclick="openVideo('${video.youtubeId}')">
                    Смотреть видео <i class="fas fa-play"></i>
                </a>
            </div>
        </div>
    `;
}

// Настройка фильтров
function setupFilterButtons() {
    // Фильтры для статей
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            // Фильтруем статьи
            const filter = button.dataset.filter;
            displayArticles(filter);
        });
    });

    // Фильтры для видео
    const filterVideoButtons = document.querySelectorAll('[data-filter-video]');
    filterVideoButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок видео
            filterVideoButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            // Фильтруем видео
            const filter = button.dataset.filterVideo;
            displayVideos(filter);
        });
    });
}

// Плавный скролл к секциям
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Открытие статьи (заглушка)
function openArticle(id) {
    event.preventDefault();
    alert('Статья будет открыта в новой версии сайта. Сейчас это демо-версия.');
}

// Открытие видео (заглушка)
function openVideo(youtubeId) {
    event.preventDefault();
    alert('Видео будет доступно в следующем обновлении. Сейчас это демо-версия.');
}

// Показать ошибку
function showError(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="loading" style="color: #e74c3c;">
            Ошибка загрузки данных. Пожалуйста, обновите страницу.
        </div>
    `;
}

// Добавляем эффект появления при скролле
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.article-card, .video-card, .about-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});