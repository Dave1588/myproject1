document.addEventListener('DOMContentLoaded', function() {
    // 為每個分類的輪播初始化
    const carouselContainers = document.querySelectorAll('#cardcarousel .carousel-container');
    
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const leftBtn = container.querySelector('.carousel-btn-left');
        const rightBtn = container.querySelector('.carousel-btn-right');
        const cardWidth = 306; // 286px + 20px gap
        const visibleCards = 3; // 一次顯示的卡片數量
        const cardsToScroll = 3; // 一次滾動的卡片數量

        let currentPosition = 0;
        const maxPosition = Math.ceil((carousel.children.length - visibleCards) / cardsToScroll);

        leftBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarousel();
            }
        });

        rightBtn.addEventListener('click', () => {
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateCarousel();
            }
        });

        function updateCarousel() {
            const translateX = -currentPosition * (cardWidth * cardsToScroll);
            carousel.style.transform = `translateX(${translateX}px)`;
        }

        // 重置輪播位置的函數
        function resetCarousel() {
            currentPosition = 0;
            carousel.style.transform = `translateX(0px)`;
        }

        // 將重置方法掛載到容器上，方便後續調用
        container.resetCarousel = resetCarousel;
    });

    // 監聽所有分類標籤的點擊事件
    const tabLinks = document.querySelectorAll('#myTab .nav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 重置所有輪播容器的位置
            carouselContainers.forEach(container => {
                container.resetCarousel();
            });
        });
    });
});