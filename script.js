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
        // 動画の読み込み完了時の処理
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.play().catch(error => {
                console.error("動画の自動再生がブロックされました:", error);
            });
        });
    }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
                    behavior: 'smooth'
                });
            }
        });
    });

    // フェードインアニメーション
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // お問い合わせフォームのバリデーション（contact.html専用）
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // 既存のエラーメッセージをクリア
            document.querySelectorAll('.error-message').forEach(el => el.remove());

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
});
