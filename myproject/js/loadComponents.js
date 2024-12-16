// 加載共用組件的函數
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// 當 DOM 完全加載後執行
document.addEventListener('DOMContentLoaded', function() {
    // 加載 header
    loadComponent('header-component', './components/header.html');
    // 加載 footer
    loadComponent('footer-component', './components/footer.html');
}); 