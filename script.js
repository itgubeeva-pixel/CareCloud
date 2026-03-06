// Данные будут загружаться из JSON файла
let articlesData = [];
let videosData = [];

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupSmoothScrolling();
    setupFilterButtons();
    setupThemeToggle();
});

// Загрузка данных из JSON
async function loadData() {
    try {
        // Пробуем разные пути для загрузки данных
        let response;
        
        // Сначала пробуем через data.json (если файл в корне web)
        try {
            response = await fetch('data.json');
            if (!response.ok) throw new Error('Not found in root');
        } catch {
            // Если не нашли, пробуем через web/data.json
            response = await fetch('web/data.json');
        }
        
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
        // Показываем демо-данные вместо ошибки
        showDemoData();
    }
}

// Показать демо-данные если файл не найден
function showDemoData() {
    // Демо-статьи
    articlesData = [
        {
            id: 1,
            title: "10 способов снизить тревожность",
            category: "психология",
            readTime: "7 мин",
            date: "15 марта 2026",
            image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
            excerpt: "Простые техники, которые помогут успокоиться за 5 минут."
        },
        {
            id: 2,
            title: "Утренние ритуалы для продуктивного дня",
            category: "привычки",
            readTime: "10 мин",
            date: "12 марта 2026",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            excerpt: "С чего начинать день, чтобы быть продуктивным и спокойным."
        },
        {
            id: 3,
            title: "Как полюбить себя: руководство",
            category: "саморазвитие",
            readTime: "12 мин",
            date: "10 марта 2026",
            image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
            excerpt: "Пошаговые упражнения для повышения самооценки."
        },
        {
            id: 4,
            title: "Дыхательные техники для спокойствия",
            category: "осознанность",
            readTime: "5 мин",
            date: "8 марта 2026",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            excerpt: "Простые упражнения для быстрого расслабления."
        },
        {
            id: 5,
            title: "Здоровые отношения: 5 признаков",
            category: "отношения",
            readTime: "8 мин",
            date: "5 марта 2026",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400",
            excerpt: "Как распознать нездоровые отношения."
        },
        {
            id: 6,
            title: "Питание для ментального здоровья",
            category: "здоровье",
            readTime: "10 мин",
            date: "3 марта 2026",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
            excerpt: "Какие продукты помогают бороться со стрессом."
        }
    ];
    
    // Демо-видео
    videosData = [
        {
            id: 1,
            title: "10-минутная медитация для успокоения",
            category: "медитация",
            duration: "10:23",
            views: "12K",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            youtubeId: "inpok4MKVLM",
            description: "Короткая медитация для снятия стресса."
        },
        {
            id: 2,
            title: "Йога для начинающих: утро",
            category: "йога",
            duration: "15:47",
            views: "8.5K",
            thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
            youtubeId: "v7AYKMP6rOE",
            description: "Мягкая утренняя йога для бодрости."
        },
        {
            id: 3,
            title: "Дыхание для снятия стресса",
            category: "дыхание",
            duration: "8:15",
            views: "5.2K",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            youtubeId: "GQm5NwFh8Rk",
            description: "Эффективные дыхательные техники."
        },
        {
            id: 4,
            title: "Как перестать переживать",
            category: "лекции",
            duration: "25:30",
            views: "18K",
            thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
            youtubeId: "dB7KNdUJkZE",
            description: "Лекция психолога о стрессе."
        },
        {
            id: 5,
            title: "Вечерняя йога для сна",
            category: "йога",
            duration: "20:10",
            views: "7.3K",
            thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
            youtubeId: "hJbRpHZr_d0",
            description: "Расслабляющая практика перед сном."
        },
        {
            id: 6,
            title: "Практика благодарности",
            category: "практики",
            duration: "7:30",
            views: "4.8K",
            thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
            youtubeId: "W8jT0LQnU6c",
            description: "Учимся замечать хорошее каждый день."
        }
    ];
    
    displayArticles('all');
    displayVideos('all');
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
