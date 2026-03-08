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
    setupScrollReveal();
    createModal();
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
            excerpt: "Простые техники, которые помогут успокоиться.",
            content: `<h2>10 простых способов снизить тревожность</h2>
            <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400" alt="Спокойствие" style="width:100%; border-radius:12px; margin:20px 0;">
            <p>Тревога — это естественная реакция организма на стресс. Но когда она становится постоянной, важно научиться с ней справляться.</p>
            
            <h3>1. Дыхание по квадрату</h3>
            <p>Вдохните на 4 счета, задержите дыхание на 4 счета, выдохните на 4 счета, задержите на 4 счета. Повторите 5 раз.</p>
            
            <h3>2. Заземление 5-4-3-2-1</h3>
            <p>Найдите 5 вещей, которые вы видите, 4 — можете потрогать, 3 — слышите, 2 — можете понюхать, 1 — можете попробовать на вкус.</p>
            
            <h3>3. Прогрессивная мышечная релаксация</h3>
            <p>Напрягите все мышцы тела на 5 секунд, затем резко расслабьте. Повторите 3 раза.</p>
            
            <h3>4. Визуализация</h3>
            <p>Представьте спокойное место (пляж, лес) со всеми деталями: звуки, запахи, ощущения.</p>
            
            <h3>5. Физическая активность</h3>
            <p>Сделайте 10 приседаний или просто пройдитесь быстрым шагом 5 минут.</p>
            
            <h3>6. Объятия</h3>
            <p>Обнимите близкого человека или подушку — это вырабатывает окситоцин.</p>
            
            <h3>7. Холодная вода</h3>
            <p>Умойтесь холодной водой или подержите руки под холодной водой.</p>
            
            <h3>8. Дневник благодарности</h3>
            <p>Запишите 3 вещи, за которые вы благодарны прямо сейчас.</p>
            
            <h3>9. Ограничение кофеина</h3>
            <p>Замените кофе на травяной чай.</p>
            
            <h3>10. Разговор с собой</h3>
            <p>Скажите себе: "Это временно. Я справлюсь".</p>`
        },
        {
            id: 2,
            title: "Утренние ритуалы успешных людей",
            category: "привычки",
            readTime: "10 мин",
            date: "12 марта 2026",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            excerpt: "Как начать день с энергии.",
            content: `<h2>5 утренних ритуалов успешных людей</h2>
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400" alt="Утро" style="width:100%; border-radius:12px; margin:20px 0;">
            <p>То, как вы начинаете утро, влияет на весь день. Вот 5 привычек, которые изменят вашу жизнь.</p>
            
            <h3>1. Просыпайтесь без телефона</h3>
            <p>Первые 30 минут после пробуждения не берите в руки телефон. Дайте мозгу проснуться естественно.</p>
            
            <h3>2. Стакан воды с лимоном</h3>
            <p>Вода запускает метаболизм и помогает проснуться быстрее кофе.</p>
            
            <h3>3. Легкая зарядка</h3>
            <p>5-10 минут растяжки или йоги разбудят тело и наполнят энергией.</p>
            
            <h3>4. Планирование дня</h3>
            <p>Запишите 3 главные задачи на день. Это поможет не распыляться.</p>
            
            <h3>5. Время для себя</h3>
            <p>Выпейте чай в тишине, почитайте книгу или помедитируйте 10 минут.</p>`
        }
    ];

    videosData = [
        {
            id: 1,
            title: "10-минутная медитация для успокоения ума",
            category: "медитация",
            duration: "10:23",
            views: "12K",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
            youtubeId: "inpok4MKVLM",
            description: "Короткая медитация, которая поможет снять стресс."
        },
        {
            id: 2,
            title: "Йога для начинающих: утренняя практика",
            category: "йога",
            duration: "15:47",
            views: "8.5K",
            thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
            youtubeId: "v7AYKMP6rOE",
            description: "Мягкая утренняя йога для бодрости."
        }
    ];
}

// Создание модального окна
function createModal() {
    // Проверяем, есть ли уже модальное окно
    if (document.getElementById('modal')) return;

    const modalHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title"></h2>
                    <button class="modal-close" id="modal-close-btn">&times;</button>
                </div>
                <div class="modal-body" id="modal-body">
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Добавляем обработчик для кнопки закрытия
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

// Открыть модальное окно
function openModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = title;
    modalBody.innerHTML = content;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Запрещаем скролл страницы
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Возвращаем скролл

    // Останавливаем видео, если оно было
    const modalBody = document.getElementById('modal-body');
    const iframe = modalBody.querySelector('iframe');
    if (iframe) {
        iframe.src = iframe.src; // Перезагружаем iframe, чтобы видео остановилось
    }
}

// Закрытие по клику вне модального окна
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Закрытие по Escape
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

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

    // Добавляем обработчики клика на карточки
    filteredArticles.forEach(article => {
        const card = document.querySelector(`.article-card[data-id="${article.id}"]`);
        if (card) {
            card.addEventListener('click', (e) => {
                // Предотвращаем всплытие, если клик по ссылке
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                openArticle(article.id);
            });
        }
    });
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

    // Добавляем обработчики клика на карточки
    filteredVideos.forEach(video => {
        const card = document.querySelector(`.video-card[data-id="${video.id}"]`);
        if (card) {
            card.addEventListener('click', (e) => {
                // Предотвращаем всплытие, если клик по ссылке
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                openVideo(video.youtubeId, video.title);
            });
        }
    });
}

// Создание карточки статьи (БЕЗ onclick)
function createArticleCard(article) {
    return `
        <div class="article-card" data-id="${article.id}" data-category="${article.category}">
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
                <a href="#" class="read-more" onclick="event.preventDefault(); openArticle(${article.id})">
                    Читать статью <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// Создание карточки видео (БЕЗ onclick)
function createVideoCard(video) {
    return `
        <div class="video-card" data-id="${video.id}" data-category="${video.category}">
            <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')">
                <span class="article-category">${translateCategory(video.category)}</span>
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
                <a href="#" class="watch-btn" onclick="event.preventDefault(); openVideo('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')">
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

    // Устанавливаем начальные стили
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Проверяем при загрузке
    window.addEventListener('load', checkScroll);
    // Проверяем при скролле
    window.addEventListener('scroll', checkScroll);
}

// Открытие статьи
function openArticle(id) {
    const article = articlesData.find(a => a.id === id);
    if (article) {
        // Если есть полный контент, показываем его
        if (article.content) {
            openModal(article.title, `<div class="article-full-content">${article.content}</div>`);
        } else {
            // Если нет, показываем заглушку с excerpt
            const content = `
                <div class="article-full-content">
                    <img src="${article.image}" alt="${article.title}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
                    <p><strong>${article.excerpt}</strong></p>
                    <p>Полная версия статьи будет доступна в следующем обновлении.</p>
                    <div style="background: var(--bg-secondary); padding: 20px; border-radius: 12px; margin-top: 20px;">
                        <p><i class="fas fa-info-circle"></i> Сейчас это демо-версия. В будущем здесь будет полный текст статьи.</p>
                    </div>
                </div>
            `;
            openModal(article.title, content);
        }
    }
}

// Открытие видео
function openVideo(youtubeId, title) {
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    const content = `
        <div class="video-wrapper">
            <iframe 
                src="${embedUrl}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <div class="video-info" style="margin-top: 20px;">
            <h3>${title}</h3>
            <p>Видео загружено с YouTube. Наслаждайтесь просмотром!</p>
        </div>
    `;
    openModal(title, content);
}
