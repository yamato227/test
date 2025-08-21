// script.js

// DOMContentLoaded イベントでスクリプトを実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの制御
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
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
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        }
    });

    // スムーススクロール機能（アンカーリンク用）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いている場合は閉じる
                if (hamburger && nav) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });

    // サービスカードのアニメーション効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // サービスカードとニュースアイテムの観察を開始
    const serviceCards = document.querySelectorAll('.service-card');
    const newsItems = document.querySelectorAll('.news-item');
    
    serviceCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    newsItems.forEach(function(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // ページトップへ戻るボタン（必要に応じて）
    const scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Escキーでモバイルメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (hamburger && nav && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // ウィンドウサイズ変更時の処理
    window.addEventListener('resize', function() {
        // デスクトップサイズに戻った時にモバイルメニューを閉じる
        if (window.innerWidth > 768) {
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // フォームバリデーション（お問い合わせページ用）
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // 簡単なバリデーション
            if (name && !name.value.trim()) {
                showError(name, 'お名前を入力してください。');
                isValid = false;
            }
            
            if (email && !email.value.trim()) {
                showError(email, 'メールアドレスを入力してください。');
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                showError(email, '正しいメールアドレスを入力してください。');
                isValid = false;
            }
            
            if (message && !message.value.trim()) {
                showError(message, 'メッセージを入力してください。');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // エラーメッセージ表示関数
    function showError(element, message) {
        // 既存のエラーメッセージを削除
        const existingError = element.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // 新しいエラーメッセージを作成
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        element.parentNode.appendChild(errorDiv);
        element.focus();
    }

    // メールアドレス形式チェック関数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    console.log('光輪寺ウェブサイトが正常に読み込まれました。');
});
