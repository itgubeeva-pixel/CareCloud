// Глобальные переменные
let articles = [];
let videos = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    
    // Загружаем данные
    loadData();
    
    // Создаем модальное окно
    createModal();
    
    // Отображаем контент
    displayArticles('all');
    displayVideos('all');
    
    // Настраиваем все обработчики
    setupFilters();
    setupThemeToggle();
    setupSmoothScroll();
});

// Загрузка данных из глобальных переменных
function loadData() {
    if (typeof ARTICLES_DATA !== 'undefined' && typeof VIDEOS_DATA !== 'undefined') {
        articles = ARTICLES_DATA;
        videos = VIDEOS_DATA;
        console.log('Данные загружены:', articles.length, 'статей,', videos.length, 'видео');
    } else {
        console.error('Данные не найдены');
        articles = [];
        videos = [];
    }
}

// СОЗДАНИЕ МОДАЛЬНОГО ОКНА
function createModal() {
    // Удаляем старое модальное окно, если есть
    const oldModal = document.getElementById('modal');
    if (oldModal) oldModal.remove();
    
    // Создаем новое
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title"></h2>
                <button class="modal-close" id="modalCloseBtn">&times;</button>
            </div>
            <div class="modal-body" id="modalBody"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики для закрытия
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ОТКРЫТЬ МОДАЛКУ
function openModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// ЗАКРЫТЬ МОДАЛКУ
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ОТОБРАЖЕНИЕ СТАТЕЙ
function displayArticles(filter = 'all') {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    let filteredArticles = [];
    
    if (filter === 'all') {
        filteredArticles = articles;
    } else {
        filteredArticles = articles.filter(a => a.category === filter);
    }
    
    if (filteredArticles.length === 0) {
        container.innerHTML = '<div class="loading">Нет статей в этой категории</div>';
        return;
    }
    
    let html = '';
    filteredArticles.forEach(article => {
        html += `
            <div class="article-card" data-id="${article.id}">
                <div class="article-image" style="background-image: url('${article.image}')">
                    <span class="article-category">${getCategoryName(article.category)}</span>
                </div>
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <div class="article-meta">
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                    </div>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <button class="read-more-btn" data-id="${article.id}">
                        Читать статью <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Добавляем обработчики на кнопки
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            openArticleById(id);
        });
    });
    
    // Добавляем обработчики на карточки
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Если кликнули не по кнопке
            if (!e.target.closest('.read-more-btn')) {
                const id = parseInt(this.dataset.id);
                openArticleById(id);
            }
        });
    });
}

// ОТОБРАЖЕНИЕ ВИДЕО
function displayVideos(filter = 'all') {
    const container = document.getElementById('videos-container');
    if (!container) return;
    
    let filteredVideos = [];
    
    if (filter === 'all') {
        filteredVideos = videos;
    } else {
        filteredVideos = videos.filter(v => v.category === filter);
    }
    
    if (filteredVideos.length === 0) {
        container.innerHTML = '<div class="loading">Нет видео в этой категории</div>';
        return;
    }
    
    let html = '';
    filteredVideos.forEach(video => {
        html += `
            <div class="video-card" data-id="${video.id}">
                <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')">
                    <span class="article-category">${getCategoryName(video.category)}</span>
                    <span class="video-duration"><i class="far fa-clock"></i> ${video.duration}</span>
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-content">
                    <h3>${video.title}</h3>
                    <div class="video-meta">
                        <span><i class="far fa-eye"></i> ${video.views} просмотров</span>
                    </div>
                    <p class="video-description">${video.description}</p>
                    <button class="watch-btn" data-id="${video.id}" data-youtube="${video.youtubeId}">
                        Смотреть видео <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Добавляем обработчики на кнопки
    document.querySelectorAll('.watch-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const youtubeId = this.dataset.youtube;
            const title = this.closest('.video-card').querySelector('h3').textContent;
            openVideoById(youtubeId, title);
        });
    });
    
    // Добавляем обработчики на карточки
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Если кликнули не по кнопке
            if (!e.target.closest('.watch-btn')) {
                const youtubeId = this.querySelector('.watch-btn').dataset.youtube;
                const title = this.querySelector('h3').textContent;
                openVideoById(youtubeId, title);
            }
        });
    });
}

// ОТКРЫТЬ СТАТЬЮ ПО ID
function openArticleById(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    // Если есть полный контент
    if (article.content) {
        openModal(article.title, `<div class="article-content-full">${article.content}</div>`);
    } else {
        // Демо-контент
        const content = `
            <div class="article-content-full">
                <img src="${article.image}" alt="${article.title}" style="width:100%; border-radius:12px; margin-bottom:20px;">
                <h2>${article.title}</h2>
                <p><strong>${article.excerpt}</strong></p>
                <p>📖 Полная версия статьи будет доступна в ближайшее время.</p>
                <div style="background:rgba(108,92,231,0.1); padding:20px; border-radius:12px; margin-top:20px;">
                    <p>✨ Спасибо за интерес к нашему контенту! Мы работаем над наполнением.</p>
                </div>
            </div>
        `;
        openModal(article.title, content);
    }
}

// ОТКРЫТЬ ВИДЕО ПО ID
function openVideoById(youtubeId, title) {
    const content = `
        <div class="video-wrapper">
            <iframe 
                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <div style="margin-top:20px;">
            <h3>${title}</h3>
            <p>🎬 Видео загружено с YouTube. Приятного просмотра!</p>
        </div>
    `;
    openModal(title, content);
}

// ПОЛУЧИТЬ НАЗВАНИЕ КАТЕГОРИИ
function getCategoryName(category) {
    const names = {
        'психология': '🧠 Психология',
        'саморазвитие': '🌱 Саморазвитие',
        'здоровье': '💪 Здоровье',
        'осознанность': '🧘 Осознанность',
        'отношения': '🤝 Отношения',
        'привычки': '⏰ Привычки',
        'медитация': '🧘 Медитация',
        'йога': '🧘‍♀️ Йога',
        'дыхание': '🌬️ Дыхание',
        'лекции': '📺 Лекции',
        'практики': '✨ Практики',
        'мотивация': '⚡ Мотивация'
    };
    return names[category] || category;
}

// НАСТРОЙКА ФИЛЬТРОВ
function setupFilters() {
    // Фильтры для статей
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayArticles(this.dataset.filter);
        });
    });
    
    // Фильтры для видео
    document.querySelectorAll('[data-filter-video]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-filter-video]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayVideos(this.dataset.filterVideo);
        });
    });
}

// НАСТРОЙКА ТЕМЫ
function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
    
    btn.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        }
    });
}

// ПЛАВНЫЙ СКРОЛЛ
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Добавляем стили для модального окна, если их нет
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        background: var(--card-bg);
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        border-radius: 24px;
        overflow: hidden;
    }
    
    .modal-header {
        padding: 20px 30px;
        background: var(--bg-secondary);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h2 {
        margin: 0;
        color: var(--text-primary);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-secondary);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .modal-close:hover {
        background: var(--bg-primary);
        color: var(--primary);
    }
    
    .modal-body {
        padding: 30px;
        overflow-y: auto;
        max-height: calc(90vh - 80px);
        color: var(--text-primary);
    }
    
    .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 12px;
    }
    
    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .read-more-btn, .watch-btn {
        background: none;
        border: none;
        color: var(--primary);
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        font-size: 0.9rem;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
    
    .read-more-btn:hover, .watch-btn:hover {
        gap: 10px;
    }
    
    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: rgba(108,92,231,0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        opacity: 0;
        transition: 0.3s;
        border: 2px solid white;
    }
    
    .video-card:hover .play-button {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    .article-card, .video-card {
        cursor: pointer;
    }
`;

document.head.appendChild(style);
