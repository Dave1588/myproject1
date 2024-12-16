// 處理所有下拉選單的行為
document.addEventListener('DOMContentLoaded', function() {
    // 通用的滑鼠移入移出功能
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
        });
    });

    // 搜尋引擎下拉選單處理
    document.querySelectorAll('.search-engine-dropdown .search-engine-option').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownButton = this.closest('.search-engine-dropdown')
                                     .querySelector('.selected-search-text');
            if (dropdownButton) {
                dropdownButton.textContent = this.textContent;
            }
        });
    });

    // 訂單管理下拉選單處理
    document.querySelectorAll('.order-management-dropdown .order-link').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
}); 