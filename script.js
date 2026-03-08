// Данные уже есть в HTML (встроенные)
let articlesData = [];
let videosData = [];

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Берем данные из глобальных переменных, которые объявлены в HTML
    if (typeof ARTICLES_DATA !== 'undefined' && typeof VIDEOS_DATA !== 'undefined') {
        articlesData = ARTICLES_DATA;
        videosData = VIDEOS_DATA;
    } else {
        // Если вдруг данных нет, создаем резервные
        console.warn('Данные не найдены, создаем резервные');
        createBackupData();
    }

    displayArticles('all');
    displayVideos('all');
    setupSmoothScrolling();
    setupFilterButtons();
    setupThemeToggle();

    // Добавляем эффект появления при скролле
    setupScrollReveal();
});

// Создание резервных данных (на всякий случай)
function createBackupData() {
    articlesData = [
        {
            id: 1,
            title: "10 способов снизить тревожность",
            category: "психология",
            readTime: "7 мин",
            date: "15 марта 2026",
            image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
            excerpt: "Простые техники, которые помогут успокоиться."
        },
        {
            id: 2,
            title: "Утренние ритуалы",
            category: "привычки",
            readTime: "10 мин",
            date: "12 марта 2026",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            excerpt: "Как начать день с энергии."
        }
    ];

    videosData = [
        {
            id: 1,
            title: "10-минутная медитация",
            category: "медитация",
            duration: "10:23",
            views: "12K",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            youtubeId: "inpok4MKVLM",
            description: "Медитация для успокоения."
        }
    ];
}

// Отображение статей с фильтром
function displayArticles(filter = 'all') {
    const container = document.getElementById('articles-container');

    if (!articlesData || articlesData.length === 0) {
        container.innerHTML = '<div class="loading">Нет статей для отображения</div>';
        return;
    }

    // Приводим фильтр к нижнему регистру для сравнения
    const filterValue = filter.toLowerCase();

    const filteredArticles = filterValue === 'all'
        ? articlesData
        : articlesData.filter(article => article.category.toLowerCase() === filterValue);

    if (filteredArticles.length === 0) {
        container.innerHTML = '<div class="loading">Нет статей в этой категории</div>';
        return;
    }

    container.innerHTML = filteredArticles.map(article => createArticleCard(article)).join('');
}

// Отображение видео с фильтром
function displayVideos(filter = 'all') {
    const container = document.getElementById('videos-container');

    if (!videosData || videosData.length === 0) {
        container.innerHTML = '<div class="loading">Нет видео для отображения</div>';
        return;
    }

    // Приводим фильтр к нижнему регистру для сравнения
    const filterValue = filter.toLowerCase();

    const filteredVideos = filterValue === 'all'
        ? videosData
        : videosData.filter(video => video.category.toLowerCase() === filterValue);

    if (filteredVideos.length === 0) {
        container.innerHTML = '<div class="loading">Нет видео в этой категории</div>';
        return;
    }

    container.innerHTML = filteredVideos.map(video => createVideoCard(video)).join('');
}

// Создание карточки статьи
function createArticleCard(article) {
    return `
        <div class="article-card" data-category="${article.category}">
            <div class="article-image" style="background-image: url('${article.image}')">
                <span class="article-category">${translateCategory(article.category)}</span>
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <div class="article-meta">
                    <span><i class="far fa-clock"></i> ${article.readTime}</span>
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                </div>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" onclick="openArticle(event, ${article.id})">
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
                <span class="article-category">${translateCategory(video.category)}</span>
                <span class="video-duration"><i class="far fa-clock"></i> ${video.duration}</span>
            </div>
            <div class="video-content">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span><i class="far fa-eye"></i> ${video.views} просмотров</span>
                </div>
                <p class="video-description">${video.description}</p>
                <a href="#" class="watch-btn" onclick="openVideo(event, '${video.youtubeId}')">
                    Смотреть видео <i class="fas fa-play"></i>
                </a>
            </div>
        </div>
    `;
}

// Перевод категорий на русский
function translateCategory(category) {
    const translations = {
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
    return translations[category] || category;
}

// Настройка фильтров
function setupFilterButtons() {
    // Фильтры для статей
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            displayArticles(filter);
        });
    });

    // Фильтры для видео
    const filterVideoButtons = document.querySelectorAll('[data-filter-video]');
    filterVideoButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterVideoButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filterVideo;
            displayVideos(filter);
        });
    });
}

// Настройка переключения темы
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
}

// Плавный скролл к секциям
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Эффект появления при скролле
function setupScrollReveal() {
    const cards = document.querySelectorAll('.article-card, .video-card, .about-card');

    // Устанавливаем начальные стили
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function checkScroll() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Проверяем при загрузке
    window.addEventListener('load', checkScroll);
    // Проверяем при скролле
    window.addEventListener('scroll', checkScroll);
}

// Открытие статьи (улучшенная заглушка)
function openArticle(event, id) {
    event.preventDefault();
    const article = articlesData.find(a => a.id === id);
    if (article) {
        alert(`✨ Статья "${article.title}" будет доступна для чтения в следующем обновлении.\n\nСейчас это демо-версия сайта.`);
    } else {
        alert('Статья будет открыта в новой версии сайта. Сейчас это демо-версия.');
    }
}

// Открытие видео (улучшенная заглушка)
function openVideo(event, youtubeId) {
    event.preventDefault();
    alert(`🎬 Видео будет доступно для просмотра в следующем обновлении.\n\nYouTube ID: ${youtubeId}\n\nСейчас это демо-версия сайта.`);
}
