document.addEventListener('DOMContentLoaded', function() {
    // 為每個分類的輪播初始化
    const carouselContainers = document.querySelectorAll('#cardcarousel .carousel-container');
    
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const leftBtn = container.querySelector('.carousel-btn-left');
        const rightBtn = container.querySelector('.carousel-btn-right');
        const cardWidth = 300; // 卡片寬度（包含邊距）
        const visibleCards = 3; // 一次顯示的卡片數量

        let currentPosition = 0;
        const maxPosition = carousel.children.length - visibleCards;

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
            const translateX = -currentPosition * cardWidth;
            carousel.style.transform = `translateX(${translateX}px)`;
        }
    });
});