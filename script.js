document.addEventListener('DOMContentLoaded', () => {
    // مدیریت نمایش ویدیو در صفحه پروژه‌ها
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        const iconDiv = card.querySelector('.icon');
        const videoContainer = card.querySelector('.video-container');
        const videoElement = videoContainer ? videoContainer.querySelector('.preview-video') : null;
        
        if (iconDiv && videoContainer) {
            let playTimeout;
            iconDiv.addEventListener('mouseenter', () => {
                playTimeout = setTimeout(() => {
                    videoContainer.classList.add('show');
                    videoElement.src = iconDiv.dataset.video;
                    videoElement.play();
                }, 300);
            });
            card.addEventListener('mouseleave', () => {
                clearTimeout(playTimeout);
                if(videoContainer) videoContainer.classList.remove('show');
                if(videoElement) { videoElement.pause(); videoElement.currentTime = 0; }
            });
        }
    });

    // اسکرول نرم
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});