document.addEventListener('DOMContentLoaded', () => {
    const appCards = document.querySelectorAll('.app-card');

    appCards.forEach(card => {
        const iconDiv = card.querySelector('.icon');
        const videoContainer = card.querySelector('.video-container');
        const videoElement = videoContainer.querySelector('.preview-video');
        const videoSrc = iconDiv.dataset.video; // گرفتن مسیر ویدیو از data-video

        // مطمئن می‌شویم مسیر ویدیو وجود دارد
        if (videoSrc) {
            videoElement.src = videoSrc;
        }

        let playTimeout; // برای ایجاد تاخیر در پخش

        iconDiv.addEventListener('mouseenter', () => {
            // ایجاد یک تاخیر کوتاه قبل از پخش ویدیو
            // این کار از پخش ناخواسته ویدیو هنگام عبور سریع ماوس جلوگیری می‌کند
            playTimeout = setTimeout(() => {
                if (videoSrc) {
                    videoContainer.classList.add('show');
                    videoElement.load(); // برای اطمینان از بارگذاری ویدیو
                    videoElement.play().catch(error => {
                        console.error('Video playback failed:', error);
                        // مدیریت خطا: مثلاً نمایش تصویر ثابت به جای ویدیو
                    });
                }
            }, 300); // 300 میلی‌ثانیه تاخیر
        });

        iconDiv.addEventListener('mouseleave', () => {
            clearTimeout(playTimeout); // پاک کردن تاخیر اگر ماوس قبل از پخش خارج شود
            if (videoSrc) {
                videoContainer.classList.remove('show');
                videoElement.pause();
                videoElement.currentTime = 0; // بازگشت به ابتدای ویدیو
            }
        });
    });
});