/**
 * 選擇高鐵站點
 * @param {HTMLButtonElement} button - 被點擊的站點按鈕
 * @param {string} type - 類型 ('departure' 或 'destination')
 */
function selectHsrStation(button, type) {
    event.preventDefault();
    const selectedText = button.textContent;
    const dropdownId = type === 'departure' ? 'hsr-departure-dropdown' : 'hsr-destination-dropdown';
    const dropdownButton = document.querySelector(`#${dropdownId} .dropdown-toggle .selected-text`);
    
    dropdownButton.textContent = selectedText;
    dropdownButton.classList.remove('text-muted');
    
    // 關閉下拉選單
    const dropdownList = button.closest('.dropdown-menu');
    dropdownList.classList.remove('show');
    button.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
}

/**
 * 交換出發站和到達站
 */
function swapHsrStations() {
    const departureText = document.querySelector('#hsr-departure-dropdown .selected-text');
    const destinationText = document.querySelector('#hsr-destination-dropdown .selected-text');
    
    const tempText = departureText.textContent;
    departureText.textContent = destinationText.textContent;
    destinationText.textContent = tempText;
    
    // 更新文字顏色
    if (departureText.textContent !== '請選擇') {
        departureText.classList.remove('text-muted');
    } else {
        departureText.classList.add('text-muted');
    }
    
    if (destinationText.textContent !== '請選擇') {
        destinationText.classList.remove('text-muted');
    } else {
        destinationText.classList.add('text-muted');
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

    // 獲取日期輸入元素
    const departDateInput = document.getElementById('hsr-departure-date');
    const returnDateInput = document.getElementById('hsr-return-date');

    // 設定最小日期為今天
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // 最多可選擇3個月內的日期

    // 格式化日期為 YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 設定日期限制
    const todayStr = formatDate(today);
    const maxDateStr = formatDate(maxDate);
    
    // 設定出發日期的限制
    departDateInput.setAttribute('min', todayStr);
    departDateInput.setAttribute('max', maxDateStr);
    
    // 如果沒有選擇日期，預設為今天
    if (!departDateInput.value) {
        departDateInput.value = todayStr;
    }

    // 設定回程日期的限制
    returnDateInput.setAttribute('min', departDateInput.value || todayStr);
    returnDateInput.setAttribute('max', maxDateStr);
    
    // 如果沒有選擇回程日期，預設與出發日期相同
    if (!returnDateInput.value) {
        returnDateInput.value = departDateInput.value || todayStr;
    }

    // 當出發日期改變時
    departDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        
        // 如果選擇的日期早於今天，重置為今天
        if (selectedDate < today) {
            this.value = todayStr;
        }
        
        // 更新回程日期的最小值
        returnDateInput.setAttribute('min', this.value);
        
        // 如果回程日期早於新的出發日期，更新回程日期
        if (returnDateInput.value < this.value) {
            returnDateInput.value = this.value;
        }
    });

    // 當回程日期改變時
    returnDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const departDate = new Date(departDateInput.value);
        
        // 如果選擇的日期早於出發日期，重置為出發日期
        if (selectedDate < departDate) {
            this.value = departDateInput.value;
        }
    });

    // 防止直接輸入無效日期
    departDateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        if (selectedDate < today) {
            this.value = todayStr;
        }
    });

    returnDateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const departDate = new Date(departDateInput.value);
        if (selectedDate < departDate) {
            this.value = departDateInput.value;
        }
    });
});

// 搜尋功能
// function searchHsr() {
//     // 獲取所有搜尋條件
//     const tripType = document.querySelector('input[name="hsrTripType"]:checked').id;
//     const departure = document.querySelector('#hsr-departure-dropdown .selected-text').textContent;
//     const destination = document.querySelector('#hsr-destination-dropdown .selected-text').textContent;
//     const departureDate = document.querySelector('#hsr-departure-date').value;
//     const returnDate = document.querySelector('#hsr-return-date').value;

//     // 驗證必填欄位
//     if (departure === '請選擇' || destination === '請選擇' || !departureDate) {
//         alert('請填寫完整的搜尋條件');
//         return;
//     }

//     // 如果是來回票，確認有選擇回程日期
//     if (tripType === 'hsrRoundTrip' && !returnDate) {
//         alert('請選擇回程日期');
//         return;
//     }

//     // TODO: 實作搜尋邏輯
//     console.log('搜尋高鐵票：', {
//         tripType,
//         departure,
//         destination,
//         departureDate,
//         returnDate
//     });
// } 
function searchHsr(event) {
    event.preventDefault(); // 阻止表單提交
    console.log('🚄 高鐵搜尋');
}