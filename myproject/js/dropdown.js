document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // 滑鼠移入時展開
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
        });
        
        // 滑鼠移出時收起
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
        });
    });
}); 