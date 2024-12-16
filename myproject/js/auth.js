document.addEventListener('DOMContentLoaded', function() {
    // 獲取元素
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // 檢查 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    
    // 如果 URL 參數指定要顯示註冊表單
    if (tab === 'register') {
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }

    // 切換表單顯示
    loginTab.addEventListener('click', function() {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        // 更新 URL，但不重新加載頁面
        history.pushState({}, '', 'login.html');
    });

    registerTab.addEventListener('click', function() {
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        // 更新 URL，但不重新加載頁面
        history.pushState({}, '', 'login.html?tab=register');
    });

    // 切換密碼顯示
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // 表單提交處理
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 這裡添加登入邏輯
        console.log('登入表單提交');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 這裡添加註冊邏輯
        console.log('註冊表單提交');
    });
}); 