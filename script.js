// script.js

// DOMContentLoaded イベントでスクリプトを実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの制御
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const body = document.body;

    if (hamburger && nav) {
        hamburger.addEventListener('click', function(event) {
            event.stopPropagation(); // ハンバーガーメニューのクリックイベントがbodyに伝播しないように
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        nav.addEventListener('click', function(event) {
            event.stopPropagation(); // ナビゲーション内のクリックイベントがbodyに伝播しないように
        });

        body.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // メニューリンクをクリックした時にメニューを閉じる
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // スクロール時のヘッダー効果
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // 動画の読み込みエラー処理と自動再生の確保
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.play().catch(error => {
                console.error('Video auto-play failed:', error);
            });
        });
        
        // 再生が止まった場合の再開処理
        heroVideo.addEventListener('ended', () => {
            heroVideo.play().catch(error => {
                console.error('Video auto-play failed after ending:', error);
            });
        });

        // ページが非表示になった場合の停止と再表示になった場合の再生
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(error => {
                    console.error('Video auto-play failed after visibility change:', error);
                });
            }
        });
    }

    // スムーススクロールの調整
    const links = document.querySelectorAll('a.scroll-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
});
