// 高鐵站點選擇功能
function selectHsrStation(button, type) {
    // 獲取選中的站點名稱
    const stationName = button.textContent;
    
    // 根據類型（出發/到達）更新對應的下拉按鈕文字
    const dropdownId = type === 'departure' ? 'hsr-departure-dropdown' : 'hsr-destination-dropdown';
    const dropdown = document.querySelector(`#${dropdownId} .selected-text`);
    dropdown.textContent = stationName;
    
    // 關閉下拉選單
    const dropdownMenu = button.closest('.dropdown-menu');
    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownMenu.previousElementSibling);
    if (bsDropdown) {
        bsDropdown.hide();
    }
}

// 交換出發站和到達站
function swapHsrStations() {
    const departureText = document.querySelector('#hsr-departure-dropdown .selected-text');
    const destinationText = document.querySelector('#hsr-destination-dropdown .selected-text');
    
    // 如果兩個站點都已選擇，則進行交換
    if (departureText.textContent !== '請選擇' && destinationText.textContent !== '請選擇') {
        const temp = departureText.textContent;
        departureText.textContent = destinationText.textContent;
        destinationText.textContent = temp;
    }
}

// 監聽高鐵分類的單程/來回選擇的變化
document.addEventListener('DOMContentLoaded', function() {
    // 獲取高鐵的單程和來回選擇的radio按鈕
    const hsrOneWayRadio = document.getElementById('hsrOneWay');
    const hsrRoundTripRadio = document.getElementById('hsrRoundTrip');
    
    // 獲取需要控制顯示/隱藏的元素
    const hsrReturnDate = document.getElementById('hsr-return-date').closest('.col-md-3');
    const hsrDateArrow = document.querySelector('.hsr-date-arrow'); // 添加箭頭的選擇器
    
    // 處理單程/來回切換
    function handleHsrTypeChange() {
        if (hsrOneWayRadio.checked) {
            // 單程：隱藏回程日期和箭頭
            hsrReturnDate.style.display = 'none';
            hsrDateArrow.style.display = 'none';
        } else {
            // 來回：顯示回程日期和箭頭
            hsrReturnDate.style.display = '';
            hsrDateArrow.style.display = '';
        }
    }
    
    // 添加事件監聽器
    hsrOneWayRadio.addEventListener('change', handleHsrTypeChange);
    hsrRoundTripRadio.addEventListener('change', handleHsrTypeChange);
    
    // 初始化時執行一次
    handleHsrTypeChange();
});

// 搜尋功能
function searchHsr() {
    // 獲取所有搜尋條件
    const tripType = document.querySelector('input[name="hsrTripType"]:checked').id;
    const departure = document.querySelector('#hsr-departure-dropdown .selected-text').textContent;
    const destination = document.querySelector('#hsr-destination-dropdown .selected-text').textContent;
    const departureDate = document.querySelector('#hsr-departure-date').value;
    const returnDate = document.querySelector('#hsr-return-date').value;

    // 驗證必填欄位
    if (departure === '請選擇' || destination === '請選擇' || !departureDate) {
        alert('請填寫完整的搜尋條件');
        return;
    }

    // 如果是來回票，確認有選擇回程日期
    if (tripType === 'hsrRoundTrip' && !returnDate) {
        alert('請選擇回程日期');
        return;
    }

    // TODO: 實作搜尋邏輯
    console.log('搜尋高鐵票：', {
        tripType,
        departure,
        destination,
        departureDate,
        returnDate
    });
} 