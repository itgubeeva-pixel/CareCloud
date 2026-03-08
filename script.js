// ПРОСТОЙ РАБОЧИЙ КОД
console.log('Скрипт работает');

// Данные
let articles = [];
let videos = [];

// Ждём загрузку страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Загружаем данные из JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Данные получены:', data);
            articles = data.articles || [];
            videos = data.videos || [];
            
            // Показываем всё
            showArticles('all');
            showVideos('all');
        })
        .catch(error => {
            console.log('Ошибка загрузки:', error);
            // Если не получилось загрузить, показываем пустоту
            document.getElementById('articlesGrid').innerHTML = '<p style="text-align:center">Не удалось загрузить статьи</p>';
        });
    
    // Настраиваем кнопки
    setupFilters();
    setupThemeToggle();
});

// Показать статьи
function showArticles(filter) {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;
    
    let filtered = [];
    if (filter === 'all') {
        filtered = articles;
    } else {
        filtered = articles.filter(a => a.category === filter);
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center">Нет статей</p>';
        return;
    }
    
    let html = '';
    filtered.forEach(article => {
        html += `
            <div class="card" onclick="openArticle(${article.id})">
                <div class="card-image" style="background-image: url('${article.image}')">
                    <span class="card-category">${article.category}</span>
                </div>
                <div class="card-content">
                    <div class="card-title">${article.title}</div>
                    <div class="card-meta">
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                    </div>
                    <div class="card-excerpt">${article.excerpt}</div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Показать видео
function showVideos(filter) {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;
    
    let filtered = [];
    if (filter === 'all') {
        filtered = videos;
    } else {
        filtered = videos.filter(v => v.category === filter);
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center">Нет видео</p>';
        return;
    }
    
    let html = '';
    filtered.forEach(video => {
        html += `
            <div class="card" onclick="openVideo('${video.youtubeId}')">
                <div class="card-image" style="background-image: url('${video.thumbnail}')">
                    <span class="card-category">${video.category}</span>
                </div>
                <div class="card-content">
                    <div class="card-title">${video.title}</div>
                    <div class="card-meta">
                        <span><i class="far fa-clock"></i> ${video.duration}</span>
                    </div>
                    <div class="card-excerpt">${video.description}</div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Открыть статью
function openArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    // Временно показываем сообщение
    alert(`Открывается статья: ${article.title}\n\nВ реальном проекте здесь будет ссылка на страницу со статьёй`);
}

// Открыть видео
function openVideo(youtubeId) {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
}

// Настройка фильтров
function setupFilters() {
    // Фильтры для статей
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showArticles(this.dataset.filter);
        };
    });
    
    // Фильтры для видео
    document.querySelectorAll('[data-filter-video]').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('[data-filter-video]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showVideos(this.dataset.filterVideo);
        };
    });
}

// Настройка темы
function setupThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    btn.onclick = function() {
        document.body.classList.toggle('dark-theme');
        this.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    };
}
