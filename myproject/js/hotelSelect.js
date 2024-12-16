/**
 * 訂房相關功能
 */

// 儲存房間和住客數量的狀態
const hotelCounts = {
    room: 1,    // 預設一間房
    adult: 2,   // 預設兩位成人
    child: 0    // 預設無兒童
};

// 設定常數
const MAX_ROOMS = 10;           // 最多10間房
const MAX_ADULTS_PER_ROOM = 4;  // 每間房最多4位成人
const MAX_CHILDREN_PER_ROOM = 3; // 每間房最多3位兒童

/**
 * 選擇目的地
 * @param {HTMLButtonElement} button - 被點擊的城市按鈕
 */
function selectHotelLocation(button) {
    event.preventDefault();
    const selectedText = button.textContent;
    const dropdownButton = button.closest('.dropdown').querySelector('.dropdown-toggle .selected-text');
    
    dropdownButton.textContent = selectedText;
    dropdownButton.classList.remove('text-muted');
    
    // 關閉下拉選單
    const dropdownList = button.closest('.dropdown-menu');
    dropdownList.classList.remove('show');
    button.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
}

/**
 * 調整房間和住客人數
 * @param {string} type - 類型 ('room', 'adult', 'child')
 * @param {number} change - 變更數量 (1 或 -1)
 * @param {Event} event - 事件對象
 */
function adjustRoomGuests(type, change, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const currentCount = hotelCounts[type];
    const roomCount = hotelCounts.room;
    
    // 檢查各種限制條件
    if (change > 0) {
        // 增加數量的限制
        if (type === 'room' && currentCount >= MAX_ROOMS) {
            showToast('最多只能預訂10間房');
            return;
        }
        
        if (type === 'adult' && currentCount >= roomCount * MAX_ADULTS_PER_ROOM) {
            showToast(`每間房最多${MAX_ADULTS_PER_ROOM}位成人`);
            return;
        }
        
        if (type === 'child' && currentCount >= roomCount * MAX_CHILDREN_PER_ROOM) {
            showToast(`每間房最多${MAX_CHILDREN_PER_ROOM}位孩童`);
            return;
        }
    } else {
        // 減少數量的限制
        if (type === 'room') {
            if (currentCount <= 1) {
                showToast('至少需要預訂1間房');
                return;
            }
            // 檢查減少房間後的人數限制
            if (hotelCounts.adult > (currentCount - 1) * MAX_ADULTS_PER_ROOM) {
                showToast('請先減少成人人數');
                return;
            }
            if (hotelCounts.child > (currentCount - 1) * MAX_CHILDREN_PER_ROOM) {
                showToast('請先減少孩童人數');
                return;
            }
        }
        
        if (type === 'adult') {
            if (currentCount <= roomCount) {
                showToast('成人人數不能少於房間數');
                return;
            }
        }
        
        if (type === 'child' && currentCount <= 0) {
            return;
        }
    }
    
    // 更新數量
    hotelCounts[type] += change;
    
    // 更新顯示
    if (type === 'room') {
        document.getElementById('room-count').textContent = hotelCounts[type];
    } else {
        document.getElementById(`hotel-${type}-count`).textContent = hotelCounts[type];
    }
    updateRoomGuestsDisplay();
}

/**
 * 更新房間和住客人數顯示
 */
function updateRoomGuestsDisplay() {
    const selectedText = document.querySelector('#room-people-dropdown .selected-text');
    const total = hotelCounts.adult + hotelCounts.child;
    
    selectedText.textContent = `${hotelCounts.room}間房, ${total}人`;
    if (hotelCounts.adult > 0) {
        selectedText.textContent += ` (成人${hotelCounts.adult}`;
        if (hotelCounts.child > 0) {
            selectedText.textContent += `, 孩童${hotelCounts.child}`;
        }
        selectedText.textContent += ')';
    }
    
    selectedText.classList.remove('text-muted');
}

/**
 * 初始化日期選擇器
 */
document.addEventListener('DOMContentLoaded', function() {
    const checkInDate = document.getElementById('check-in-date');
    const checkOutDate = document.getElementById('check-out-date');
    
    // 設置最小日期為今天
    const today = new Date().toISOString().split('T')[0];
    checkInDate.min = today;
    checkOutDate.min = today;
    
    // 入住日期變更時更新退房最小日期
    checkInDate.addEventListener('change', function() {
        checkOutDate.min = this.value;
        if (checkOutDate.value && checkOutDate.value < this.value) {
            checkOutDate.value = this.value;
        }
    });
    
    // 初始化顯示
    updateRoomGuestsDisplay();
});

/**
 * 搜尋住宿
 */
function searchHotels() {
    event.preventDefault(); // 阻止表單提交
    console.log('🏨 住宿搜尋');
}

// 初始化訂房人數選擇器
function initializeHotelPeopleCount() {
    // 檢查是否在訂房頁面
    const hotelTab = document.getElementById('tab-hotels');
    if (!hotelTab) {
        return; // 如果不在訂房頁面，直接返回
    }

    // 獲取所有需要的元素
    const elements = {
        adultCount: document.getElementById('adult-count'),
        adultMinus: document.getElementById('adult-minus'),
        adultPlus: document.getElementById('adult-plus'),
        childCount: document.getElementById('child-count'),
        childMinus: document.getElementById('child-minus'),
        childPlus: document.getElementById('child-plus')
    };

    // 檢查所有元素是否都存在
    if (Object.values(elements).some(el => !el)) {
        console.log('部分訂房相關元素不存在');
        return;
    }

    // 重置成人數量
    elements.adultCount.textContent = '2';
    elements.adultMinus.classList.remove('disabled');
    elements.adultPlus.classList.remove('disabled');
    
    // 重置小孩數量
    elements.childCount.textContent = '0';
    elements.childMinus.classList.add('disabled');
    elements.childPlus.classList.remove('disabled');
    
    // 重置顯示文字
    updateHotelPeopleDisplay();
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeHotelPeopleCount();
});

// 更新人數顯示文字
function updateHotelPeopleDisplay() {
    const adultCount = parseInt(document.getElementById('adult-count').textContent);
    const childCount = parseInt(document.getElementById('child-count').textContent);
    const displayText = `${adultCount + childCount}人 (成人${adultCount}人${childCount > 0 ? `、小孩${childCount}人` : ''})`;
    document.querySelector('#hotel-people-dropdown .selected-text').textContent = displayText;
} 