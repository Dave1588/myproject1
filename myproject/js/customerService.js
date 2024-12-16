// 客服功能
function openCustomerService() {
    // 這裡可以添加打開客服視窗的邏輯
    // 例如：打開一個模態框或是重定向到客服頁面
    // 創建 alert 元素
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.bottom = '140px';  // 位置在客服按鈕上方
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1050';
    alertDiv.style.maxWidth = '300px';
    
    // Alert 內容
    alertDiv.innerHTML = `
        <i class="fas fa-headset me-2"></i>
        親愛的旅客您好，智慧客服系統正在開發中，如需協助請撥打客服專線：<br>
        <strong>0800-3345-678</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // 添加到頁面
    document.body.appendChild(alertDiv);
    
    // 3秒後自動消失
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
} 