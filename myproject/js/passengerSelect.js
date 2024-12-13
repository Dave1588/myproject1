/**
 * 乘客人數相關功能
 */

// 儲存乘客數量的狀態
const passengerCounts = {
    adult: 1,  // 預設一位大人
    child: 0,
    infant: 0
};

// 設定常數
const MAX_TOTAL_PASSENGERS = 8;  // 大人加孩童的最大人數

// 在文件開頭添加 Toast 實例
let toastInstance;

// 在 DOMContentLoaded 事件中初始化 Toast
document.addEventListener('DOMContentLoaded', function() {
    const toastElement = document.getElementById('passengerToast');
    toastInstance = new bootstrap.Toast(toastElement, {
        delay: 2000  // 2秒後自動消失
    });
});

/**
 * 顯示提示訊息
 * @param {string} message - 要顯示的訊息
 */
function showToast(message) {
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message;
    toastInstance.show();
}

/**
 * 調整乘客人數
 * @param {string} type - 乘客類型 ('adult', 'child', 'infant')
 * @param {number} change - 變更數量 (1 或 -1)
 * @param {Event} event - 事件對象
 */
function adjustPassenger(type, change, event) {
    // 阻止按鈕的默認行為
    event.preventDefault();
    event.stopPropagation();
    
    const currentCount = passengerCounts[type];
    const adultCount = passengerCounts.adult;
    const currentTotal = passengerCounts.adult + passengerCounts.child;  // 計算當前總人數（不含嬰兒）
    
    // 檢查各種限制條件
    if (change > 0) {
        // 檢查總人數限制（僅針對大人和孩童）
        if (type !== 'infant' && currentTotal >= MAX_TOTAL_PASSENGERS) {
            showToast('成人與孩童總人數不能超過8人');
            return;
        }
        
        // 其他增加人數的限制
        if (type === 'child' && (currentCount + change) > adultCount * 2) {
            showToast('每位成人最多帶2位孩童');
            return;
        }
        if (type === 'infant' && (currentCount + change) > adultCount) {
            showToast('每位成人最多帶1位嬰兒');
            return;
        }
    } else {
        // 減少人數的限制
        if (type === 'adult' && currentCount <= 1) {
            showToast('至少需要1位成人');
            return;
        }
        if ((type === 'child' || type === 'infant') && currentCount <= 0) {
            return;
        }
        // 檢查減少大人數量時的孩童和嬰兒比例
        if (type === 'adult') {
            if (passengerCounts.child > (adultCount - 1) * 2) {
                showToast('請先減少孩童人數');
                return;
            }
            if (passengerCounts.infant > (adultCount - 1)) {
                showToast('請先減少嬰兒人數');
                return;
            }
        }
    }
    
    // 更新人數
    passengerCounts[type] += change;
    
    // 更新顯示
    document.getElementById(`${type}-count`).textContent = passengerCounts[type];
    updateTotalPassengers();
}

/**
 * 更新總人數顯示
 */
function updateTotalPassengers() {
    const total = passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    const totalWithoutInfant = passengerCounts.adult + passengerCounts.child;
    const selectedText = document.querySelector('#people-dropdown .selected-text');
    
    selectedText.textContent = `${total}人 (成人${passengerCounts.adult}`;
    
    if (passengerCounts.child > 0) {
        selectedText.textContent += `, 孩童${passengerCounts.child}`;
    }
    if (passengerCounts.infant > 0) {
        selectedText.textContent += `, 嬰兒${passengerCounts.infant}`;
    }
    
    selectedText.textContent += ')';
    selectedText.classList.remove('text-muted');
    
    if (totalWithoutInfant === MAX_TOTAL_PASSENGERS) {
        selectedText.title = '已達成人與孩童人數上限';
    } else {
        selectedText.title = '';
    }
} 