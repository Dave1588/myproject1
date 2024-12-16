// 返回頁首功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        // 當頁面滾動超過 300px 時顯示按鈕
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // 點擊按鈕返回頁首
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 平滑滾動
        });
    });
});
