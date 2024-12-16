/**
 * 團體旅遊相關功能
 */

/**
 * 選擇地點
 * @param {HTMLButtonElement} button - 被點擊的城市按鈕
 * @param {string} type - 類型 ('departure' 或 'destination')
 */
function selectGroupLocation(button, type) {
    event.preventDefault();
    const selectedText = button.textContent;
    const dropdownId = type === 'departure' ? 'group-departure-dropdown' : 'group-destination-dropdown';
    const dropdownButton = document.querySelector(`#${dropdownId} .dropdown-toggle .selected-text`);
    
    dropdownButton.textContent = selectedText;
    dropdownButton.classList.remove('text-muted');
    
    // 關閉下拉選單
    const dropdownList = button.closest('.dropdown-menu');
    dropdownList.classList.remove('show');
    button.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
}

/**
 * 初始化日期選擇器
 */
document.addEventListener('DOMContentLoaded', function() {
    const startDate = document.getElementById('group-start-date');
    const endDate = document.getElementById('group-end-date');
    
    // 設置最小日期為今天
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6); // 最多可選擇6個月內的日期
    
    const todayStr = today.toISOString().split('T')[0];
    const maxDateStr = maxDate.toISOString().split('T')[0];
    
    startDate.min = todayStr;
    startDate.max = maxDateStr;
    endDate.min = todayStr;
    endDate.max = maxDateStr;
    
    // 開始日期變更時更新結束日期的最小值
    startDate.addEventListener('change', function() {
        endDate.min = this.value;
        if (endDate.value && endDate.value < this.value) {
            endDate.value = this.value;
        }
    });
    
    // 結束日期變更時更新開始日期的最大值
    endDate.addEventListener('change', function() {
        if (startDate.value && startDate.value > this.value) {
            startDate.value = this.value;
        }
    });
});

/**
 * 驗證搜尋條件
 * @returns {boolean} 是否通過驗證
 */
function validateGroupSearch() {
    const departure = document.querySelector('#group-departure-dropdown .selected-text').textContent;
    const destination = document.querySelector('#group-destination-dropdown .selected-text').textContent;
    const startDate = document.getElementById('group-start-date').value;
    const endDate = document.getElementById('group-end-date').value;
    
    if (departure === '請選擇') {
        showToast('請選擇出發地');
        return false;
    }
    
    if (destination === '請選擇') {
        showToast('請選擇目的地');
        return false;
    }
    
    if (!startDate) {
        showToast('請選擇出發區間開始日期');
        return false;
    }
    
    if (!endDate) {
        showToast('請選擇出發區間結束日期');
        return false;
    }
    
    return true;
}

/**
 * 搜尋團體行程
 */
function searchGroups(event) {
    event.preventDefault(); // 阻止表單提交
    console.log('👥 團體行程搜尋');
}