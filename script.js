// ПРОСТОЙ И РАБОЧИЙ КОД
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
    
    // Создаем модальное окно
    создатьМодалку();
});

function загрузитьДанные() {
    console.log('Загружаем данные...');
    
    if (typeof ARTICLES_DATA !== 'undefined') {
        статьи = ARTICLES_DATA;
        console.log('Статей загружено:', статьи.length);
    } else {
        console.log('Данные статей не найдены, создаем тестовые');
        статьи = [
            {
                id: 1,
                title: "10 способов снизить тревожность",
                category: "психология",
                readTime: "7 мин",
                date: "15 марта 2026",
                image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
                excerpt: "Простые техники для успокоения"
            },
            {
                id: 2,
                title: "Утренние ритуалы",
                category: "привычки",
                readTime: "10 мин",
                date: "12 марта 2026",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
                excerpt: "Как начать день с энергии"
            }
        ];
    }
    
    if (typeof VIDEOS_DATA !== 'undefined') {
        видео = VIDEOS_DATA;
        console.log('Видео загружено:', видео.length);
    } else {
        console.log('Данные видео не найдены, создаем тестовые');
        видео = [
            {
                id: 1,
                title: "Медитация для успокоения",
                category: "медитация",
                duration: "10:23",
                views: "12K",
                thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
                youtubeId: "inpok4MKVLM",
                description: "Короткая медитация"
            }
        ];
    }
}

// СОЗДАЕМ МОДАЛЬНОЕ ОКНО
function создатьМодалку() {
    console.log('Создаем модальное окно');
    
    // Удаляем старую модалку если есть
    const старая = document.getElementById('модалка');
    if (старая) старая.remove();
    
    // Создаем новую
    const модалка = document.createElement('div');
    модалка.id = 'модалка';
    модалка.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 999999;
        align-items: center;
        justify-content: center;
    `;
    
    модалка.innerHTML = `
        <div style="
            background: white;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
        ">
            <div style="
                padding: 20px 30px;
                background: #f5f5f5;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h2 id="модалкаЗаголовок" style="margin:0; color:#333;"></h2>
                <button id="закрытьМодалку" style="
                    background: none;
                    border: none;
                    font-size: 30px;
                    cursor: pointer;
                    color: #666;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            <div id="модалкаКонтент" style="
                padding: 30px;
                overflow-y: auto;
                max-height: calc(90vh - 80px);
                background: white;
                color: #333;
            "></div>
        </div>
    `;
    
    document.body.appendChild(модалка);
    
    // Кнопка закрытия
    document.getElementById('закрытьМодалку').onclick = function() {
        document.getElementById('модалка').style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Закрытие по клику вне окна
    модалка.onclick = function(e) {
        if (e.target === модалка) {
            модалка.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Закрытие по Escape
    document.onkeydown = function(e) {
        if (e.key === 'Escape') {
            const мод = document.getElementById('модалка');
            if (мод.style.display === 'flex') {
                мод.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    };
    
    console.log('Модальное окно создано');
}

// ПОКАЗАТЬ СТАТЬИ
function показатьСтатьи(фильтр) {
    console.log('Показываем статьи, фильтр:', фильтр);
    
    const контейнер = document.getElementById('articles-container');
    if (!контейнер) {
        console.log('Контейнер для статей не найден!');
        return;
    }
    
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
            <div class="статья-карточка" data-id="${статья.id}" style="
                background: var(--card-bg);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: var(--shadow);
                cursor: pointer;
                margin-bottom: 20px;
            ">
                <div style="height:200px; background-image:url('${статья.image}'); background-size:cover; background-position:center; position:relative;">
                    <span style="position:absolute; top:15px; left:15px; background:white; padding:5px 15px; border-radius:20px; font-size:14px; color:#6c5ce7;">${статья.category}</span>
                </div>
                <div style="padding:20px;">
                    <h3 style="margin:0 0 10px; color:var(--text-primary);">${статья.title}</h3>
                    <div style="display:flex; gap:15px; color:var(--text-secondary); font-size:14px; margin-bottom:10px;">
                        <span><i class="far fa-clock"></i> ${статья.readTime}</span>
                        <span><i class="far fa-calendar"></i> ${статья.date}</span>
                    </div>
                    <p style="color:var(--text-secondary); margin-bottom:15px;">${статья.excerpt}</p>
                    <button class="читать-кнопка" data-id="${статья.id}" style="
                        background: none;
                        border: none;
                        color: #6c5ce7;
                        font-weight: 600;
                        cursor: pointer;
                        padding: 0;
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                    ">Читать статью <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        `;
    });
    
    контейнер.innerHTML = html;
    
    // Добавляем обработчики на кнопки
    document.querySelectorAll('.читать-кнопка').forEach(кнопка => {
        кнопка.onclick = function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            открытьСтатью(parseInt(id));
        };
    });
    
    // Добавляем обработчики на карточки
    document.querySelectorAll('.статья-карточка').forEach(карточка => {
        карточка.onclick = function(e) {
            if (!e.target.closest('.читать-кнопка')) {
                const id = this.dataset.id;
                открытьСтатью(parseInt(id));
            }
        };
    });
}

// ПОКАЗАТЬ ВИДЕО
function показатьВидео(фильтр) {
    console.log('Показываем видео, фильтр:', фильтр);
    
    const контейнер = document.getElementById('videos-container');
    if (!контейнер) {
        console.log('Контейнер для видео не найден!');
        return;
    }
    
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
            <div class="видео-карточка" data-id="${видео.id}" style="
                background: var(--card-bg);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: var(--shadow);
                cursor: pointer;
                margin-bottom: 20px;
            ">
                <div style="height:200px; background-image:url('${видео.thumbnail}'); background-size:cover; background-position:center; position:relative;">
                    <span style="position:absolute; top:15px; left:15px; background:white; padding:5px 15px; border-radius:20px; font-size:14px; color:#6c5ce7;">${видео.category}</span>
                    <span style="position:absolute; bottom:15px; right:15px; background:rgba(0,0,0,0.8); color:white; padding:4px 8px; border-radius:4px;">${видео.duration}</span>
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:60px; background:#6c5ce7; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:24px; opacity:0; transition:0.3s; border:2px solid white;" class="play-кнопка">▶</div>
                </div>
                <div style="padding:20px;">
                    <h3 style="margin:0 0 10px; color:var(--text-primary);">${видео.title}</h3>
                    <div style="color:var(--text-secondary); font-size:14px; margin-bottom:10px;">
                        <span><i class="far fa-eye"></i> ${видео.views} просмотров</span>
                    </div>
                    <p style="color:var(--text-secondary); margin-bottom:15px;">${видео.description}</p>
                    <button class="смотреть-кнопка" data-youtube="${видео.youtubeId}" style="
                        background: none;
                        border: none;
                        color: #6c5ce7;
                        font-weight: 600;
                        cursor: pointer;
                        padding: 0;
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                    ">Смотреть видео <i class="fas fa-play"></i></button>
                </div>
            </div>
        `;
    });
    
    контейнер.innerHTML = html;
    
    // Добавляем эффект для кнопки play
    document.querySelectorAll('.видео-карточка').forEach(карточка => {
        карточка.onmouseenter = function() {
            this.querySelector('.play-кнопка').style.opacity = '1';
        };
        карточка.onmouseleave = function() {
            this.querySelector('.play-кнопка').style.opacity = '0';
        };
    });
    
    // Добавляем обработчики на кнопки
    document.querySelectorAll('.смотреть-кнопка').forEach(кнопка => {
        кнопка.onclick = function(e) {
            e.stopPropagation();
            const youtubeId = this.dataset.youtube;
            const заголовок = this.closest('.видео-карточка').querySelector('h3').textContent;
            открытьВидео(youtubeId, заголовок);
        };
    });
    
    // Добавляем обработчики на карточки
    document.querySelectorAll('.видео-карточка').forEach(карточка => {
        карточка.onclick = function(e) {
            if (!e.target.closest('.смотреть-кнопка')) {
                const youtubeId = this.querySelector('.смотреть-кнопка').dataset.youtube;
                const заголовок = this.querySelector('h3').textContent;
                открытьВидео(youtubeId, заголовок);
            }
        };
    });
}

// ОТКРЫТЬ СТАТЬЮ
function открытьСтатью(id) {
    console.log('Открываем статью:', id);
    
    const статья = статьи.find(s => s.id === id);
    if (!статья) return;
    
    let контент = `
        <div style="line-height:1.8;">
            <img src="${статья.image}" alt="${статья.title}" style="width:100%; border-radius:12px; margin-bottom:20px;">
            <h2 style="color:#6c5ce7; margin-bottom:20px;">${статья.title}</h2>
            <p style="margin-bottom:20px; font-size:18px;"><strong>${статья.excerpt}</strong></p>
    `;
    
    // Добавляем разный контент для разных статей
    if (id === 1) {
        контент += `
            <h3>1. Дыхание по квадрату</h3>
            <p>Вдох (4 сек) - задержка (4 сек) - выдох (4 сек) - задержка (4 сек). Повторить 5 раз.</p>
            
            <h3>2. Заземление 5-4-3-2-1</h3>
            <p>Найдите 5 вещей, которые видите, 4 - можете потрогать, 3 - слышите, 2 - можете понюхать, 1 - можете попробовать.</p>
            
            <h3>3. Мышечная релаксация</h3>
            <p>Напрягите все мышцы на 5 секунд, затем расслабьте. Повторите 3 раза.</p>
        `;
    } else if (id === 2) {
        контент += `
            <h3>1. Просыпайтесь без телефона</h3>
            <p>Первые 30 минут не берите телефон - дайте мозгу проснуться.</p>
            
            <h3>2. Стакан воды</h3>
            <p>Вода с лимоном запускает метаболизм.</p>
            
            <h3>3. Легкая зарядка</h3>
            <p>5-10 минут растяжки разбудят тело.</p>
        `;
    } else if (id === 10) {
        контент += `
            <h3>Что такое синдром самозванца?</h3>
            <p>Это когда человек не верит в свои успехи и боится, что все узнают, что он "самозванец".</p>
            
            <h3>Как справиться:</h3>
            <ul style="margin-left:20px;">
                <li>Ведите дневник успехов</li>
                <li>Разрешите себе ошибаться</li>
                <li>Перестаньте сравнивать себя с другими</li>
                <li>Принимайте комплименты</li>
            </ul>
        `;
    } else {
        контент += `<p>Полный текст статьи готовится к публикации. Загляните позже!</p>`;
    }
    
    контент += `</div>`;
    
    // Показываем в модалке
    document.getElementById('модалкаЗаголовок').textContent = статья.title;
    document.getElementById('модалкаКонтент').innerHTML = контент;
    document.getElementById('модалка').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ОТКРЫТЬ ВИДЕО
function открытьВидео(youtubeId, заголовок) {
    console.log('Открываем видео:', youtubeId);
    
    const контент = `
        <div>
            <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin-bottom:20px;">
                <iframe 
                    src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" 
                    style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <h3 style="margin-bottom:10px;">${заголовок}</h3>
            <p>🎬 Приятного просмотра!</p>
        </div>
    `;
    
    document.getElementById('модалкаЗаголовок').textContent = заголовок;
    document.getElementById('модалкаКонтент').innerHTML = контент;
    document.getElementById('модалка').style.display = 'flex';
    document.body.style.overflow = 'hidden';
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
