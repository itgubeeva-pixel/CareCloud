// ПРОСТОЙ КОД - ТОЛЬКО ПЕРЕХОДЫ ПО ССЫЛКАМ
console.log('Скрипт загружен!');

// Данные
let статьи = [];
let видео = [];

// Ждем загрузку страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, начинаем работу');
    
    // Загружаем данные
    загрузитьДанные();
    
    // Показываем контент
    показатьСтатьи('all');
    показатьВидео('all');
    
    // Настраиваем кнопки
    настроитьКнопки();
});

function загрузитьДанные() {
    console.log('Загружаем данные...');
    
    if (typeof ARTICLES_DATA !== 'undefined') {
        статьи = ARTICLES_DATA;
        console.log('Статей загружено:', статьи.length);
    }
    
    if (typeof VIDEOS_DATA !== 'undefined') {
        видео = VIDEOS_DATA;
        console.log('Видео загружено:', видео.length);
    }
}

// ПОКАЗАТЬ СТАТЬИ
function показатьСтатьи(фильтр) {
    const контейнер = document.getElementById('articles-container');
    if (!контейнер) return;
    
    let отфильтрованные = [];
    if (фильтр === 'all') {
        отфильтрованные = статьи;
    } else {
        отфильтрованные = статьи.filter(s => s.category === фильтр);
    }
    
    if (отфильтрованные.length === 0) {
        контейнер.innerHTML = '<div style="text-align:center; padding:40px;">Нет статей</div>';
        return;
    }
    
    let html = '';
    отфильтрованные.forEach(статья => {
        html += `
            <div class="article-card" data-id="${статья.id}" style="
                background: var(--card-bg);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: var(--shadow);
                cursor: pointer;
                margin-bottom: 20px;
                border: 1px solid var(--border-color);
            ">
                <div style="height:200px; background-image:url('${статья.image}'); background-size:cover; background-position:center; position:relative;">
                    <span style="position:absolute; top:15px; left:15px; background:var(--card-bg); padding:5px 15px; border-radius:20px; font-size:14px; color:var(--primary); border:1px solid var(--border-color);">${translateCategory(статья.category)}</span>
                </div>
                <div style="padding:20px;">
                    <h3 style="margin:0 0 10px; color:var(--text-primary);">${статья.title}</h3>
                    <div style="display:flex; gap:15px; color:var(--text-secondary); font-size:14px; margin-bottom:10px;">
                        <span><i class="far fa-clock"></i> ${статья.readTime}</span>
                        <span><i class="far fa-calendar"></i> ${статья.date}</span>
                    </div>
                    <p style="color:var(--text-secondary); margin-bottom:15px;">${статья.excerpt}</p>
                </div>
            </div>
        `;
    });
    
    контейнер.innerHTML = html;
    
    // При клике на карточку открываем ссылку
    document.querySelectorAll('.article-card').forEach(карточка => {
        карточка.onclick = function() {
            const id = this.dataset.id;
            открытьСсылку(id);
        };
    });
}

// ПОКАЗАТЬ ВИДЕО
function показатьВидео(фильтр) {
    const контейнер = document.getElementById('videos-container');
    if (!контейнер) return;
    
    let отфильтрованные = [];
    if (фильтр === 'all') {
        отфильтрованные = видео;
    } else {
        отфильтрованные = видео.filter(v => v.category === фильтр);
    }
    
    if (отфильтрованные.length === 0) {
        контейнер.innerHTML = '<div style="text-align:center; padding:40px;">Нет видео</div>';
        return;
    }
    
    let html = '';
    отфильтрованные.forEach(видео => {
        html += `
            <div class="video-card" data-id="${видео.id}" data-youtube="${видео.youtubeId}" style="
                background: var(--card-bg);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: var(--shadow);
                cursor: pointer;
                margin-bottom: 20px;
                border: 1px solid var(--border-color);
            ">
                <div style="height:200px; background-image:url('${видео.thumbnail}'); background-size:cover; background-position:center; position:relative;">
                    <span style="position:absolute; top:15px; left:15px; background:var(--card-bg); padding:5px 15px; border-radius:20px; font-size:14px; color:var(--primary); border:1px solid var(--border-color);">${translateCategory(видео.category)}</span>
                    <span style="position:absolute; bottom:15px; right:15px; background:rgba(0,0,0,0.8); color:white; padding:4px 8px; border-radius:4px; font-size:0.8rem;">${видео.duration}</span>
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:60px; background:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:24px; opacity:0; transition:0.3s; border:2px solid white;" class="play-кнопка">▶</div>
                </div>
                <div style="padding:20px;">
                    <h3 style="margin:0 0 10px; color:var(--text-primary);">${видео.title}</h3>
                    <p style="color:var(--text-secondary); margin-bottom:0;">${видео.description}</p>
                </div>
            </div>
        `;
    });
    
    контейнер.innerHTML = html;
    
    // Эффект для кнопки play
    document.querySelectorAll('.video-card').forEach(карточка => {
        карточка.onmouseenter = function() {
            const play = this.querySelector('.play-кнопка');
            if (play) play.style.opacity = '1';
        };
        карточка.onmouseleave = function() {
            const play = this.querySelector('.play-кнопка');
            if (play) play.style.opacity = '0';
        };
    });
    
    // При клике на карточку открываем YouTube
    document.querySelectorAll('.video-card').forEach(карточка => {
        карточка.onclick = function() {
            const youtubeId = this.dataset.youtube;
            window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
        };
    });
}

// ОТКРЫТЬ ССЫЛКУ НА СТАТЬЮ
function открытьСсылку(id) {
    // Здесь должны быть ссылки на реальные статьи
    // Пока открываем заглушку
    const статья = статьи.find(s => s.id === id);
    if (!статья) return;
    
    // Создаем URL из названия статьи
    const url = `https://carecloud.ru/articles/${статья.id}-${статья.title.toLowerCase().replace(/[^\wа-яё]+/gi, '-')}`;
    
    // Открываем в новой вкладке (замените на реальные ссылки, когда будут)
    alert(`В реальном сайте здесь откроется статья: ${статья.title}\n\nСейчас это демо-версия.`);
    // window.open(url, '_blank');
}

// Перевод категорий
function translateCategory(category) {
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

// НАСТРОИТЬ КНОПКИ
function настроитьКнопки() {
    console.log('Настраиваем кнопки фильтров');
    
    // Фильтры для статей
    document.querySelectorAll('[data-filter]').forEach(кнопка => {
        кнопка.onclick = function() {
            document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            показатьСтатьи(this.dataset.filter);
        };
    });
    
    // Фильтры для видео
    document.querySelectorAll('[data-filter-video]').forEach(кнопка => {
        кнопка.onclick = function() {
            document.querySelectorAll('[data-filter-video]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            показатьВидео(this.dataset.filterVideo);
        };
    });
    
    // Переключение темы
    const тоггл = document.getElementById('theme-toggle');
    if (тоггл) {
        тоггл.onclick = function() {
            if (document.body.classList.contains('light-theme')) {
                document.body.className = 'dark-theme';
                localStorage.setItem('theme', 'dark-theme');
            } else {
                document.body.className = 'light-theme';
                localStorage.setItem('theme', 'light-theme');
            }
        };
    }
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(ссылка => {
        ссылка.onclick = function(e) {
            e.preventDefault();
            const цель = document.querySelector(this.getAttribute('href'));
            if (цель) цель.scrollIntoView({ behavior: 'smooth' });
        };
    });
}

console.log('Скрипт готов к работе!');
