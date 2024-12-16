document.addEventListener('DOMContentLoaded', function() {
    // 只處理機票的單程和來回選擇
    const oneWayRadio = document.getElementById('oneWay');
    const roundTripRadio = document.getElementById('roundTrip');
    
    // 獲取需要控制顯示/隱藏的元素
    const returnDateContainer = document.getElementById('return-date-container');
    const dateArrow = document.getElementById('date-arrow');
    
    // 監聽單程/來回選擇的變化
    function handleFlightTypeChange() {
        if (oneWayRadio.checked) {
            // 單程：隱藏回程日期和箭頭
            returnDateContainer.style.display = 'none';
            dateArrow.classList.remove('d-flex');
            dateArrow.style.display = 'none';
        } else {
            // 來回：顯示回程日期和箭頭
            returnDateContainer.style.display = '';
            dateArrow.style.display = 'flex';
            dateArrow.classList.add('d-flex');
        }
    }
    
    // 添加事件監聽器
    oneWayRadio.addEventListener('change', handleFlightTypeChange);
    roundTripRadio.addEventListener('change', handleFlightTypeChange);
    
    // 初始化時執行一次，確保頁面載入時顯示正確
    handleFlightTypeChange();
}); 