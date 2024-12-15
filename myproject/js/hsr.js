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
    // 使用更具體的選擇器，只針對高鐵分類的按鈕
    const hsrTripTypeInputs = document.querySelectorAll('#tab-hsr input[name="hsrTripType"]');
    const returnDateGroup = document.querySelector('#hsr-return-date').closest('.col-md-3');
    const returnArrow = returnDateGroup.previousElementSibling;

    // 確保高鐵分類按鈕組的狀態正確顯示
    function updateHsrTripTypeButtons() {
        hsrTripTypeInputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (input.checked) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    // 初始化時更新高鐵按鈕狀態
    updateHsrTripTypeButtons();

    hsrTripTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            // 更新高鐵按鈕狀態
            updateHsrTripTypeButtons();
            
            // 處理回程日期的顯示/隱藏
            if (this.id === 'hsrOneWay') {
                returnDateGroup.style.display = 'none';
                returnArrow.style.display = 'none';
            } else {
                returnDateGroup.style.display = '';
                returnArrow.style.display = '';
            }
        });
    });
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