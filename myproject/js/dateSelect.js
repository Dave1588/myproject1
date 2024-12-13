/**
 * 日期選擇相關功能
 */
document.addEventListener('DOMContentLoaded', function() {
    const departureDate = document.getElementById('departure-date');
    const returnDate = document.getElementById('return-date');
    
    // 設置最小日期為今天
    const today = new Date().toISOString().split('T')[0];
    departureDate.min = today;
    returnDate.min = today;
    
    // 初始化 tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // 去程日期變更時更新回程最小日期
    departureDate.addEventListener('change', function() {
        returnDate.min = this.value;
        if (returnDate.value && returnDate.value < this.value) {
            returnDate.value = this.value;
        }
    });
    
    // 日期格式化功能
    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // 驗證日期選擇
    function validateDates() {
        const depDate = new Date(departureDate.value);
        const retDate = new Date(returnDate.value);
        
        if (retDate < depDate) {
            returnDate.parentElement.classList.add('is-invalid');
            return false;
        }
        
        returnDate.parentElement.classList.remove('is-invalid');
        return true;
    }
    
    // 添加日期驗證
    returnDate.addEventListener('change', validateDates);
}); 