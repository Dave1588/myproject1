/**
 * dropdown.js
 * 用於處理網站中所有下拉選單的相關功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有下拉選單元素
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // 為每個下拉選單添加滑鼠移入移出事件
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // 滑鼠移入時展開下拉選單
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
        });
        
        // 滑鼠移出時收起下拉選單
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
        });
    });
    
    // 處理下拉選單項目的點擊事件
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // 防止默認的點擊行為
            e.preventDefault();
            
            // 獲取當前下拉選單的按鈕元素
            const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
            
            // 更新按鈕文字為選中的選項文字
            dropdownButton.textContent = this.textContent;
            
            // TODO: 可以在這裡添加其他功能，例如：
            // - 觸發表單驗證
            // - 更新隱藏的input值
            // - 觸發相關的數據更新
            // - 發送AJAX請求等
        });
    });
}); 