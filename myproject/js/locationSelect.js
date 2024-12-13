/**
 * 選擇地點的功能
 * @param {HTMLButtonElement} button - 被點擊的城市按鈕
 * @param {string} type - 'departure' 或 'destination'
 */
function selectLocation(button, type) {
    // 阻止按鈕的默認行為
    event.preventDefault();
    
    const selectedText = button.textContent;
    const dropdownButton = button.closest('.dropdown').querySelector('.dropdown-toggle');
    
    // 更新選擇的文字
    const selectedTextSpan = dropdownButton.querySelector('.selected-text');
    selectedTextSpan.textContent = selectedText;
    selectedTextSpan.classList.remove('text-muted');
    
    // 手動關閉下拉選單
    const dropdownList = button.closest('.dropdown-menu');
    dropdownList.classList.remove('show');
    dropdownButton.setAttribute('aria-expanded', 'false');
}

/**
 * 交換出發地和目的地的功能
 * 
 * 功能說明：
 * 1. 獲取出發地和目的地的當前選擇文字
 * 2. 交換兩者的文字內容
 * 3. 保持標題和樣式不變
 */
function swapLocations() {
    // 獲取出發地和目的地的文字元素
    const departureText = document.querySelector('#departure-dropdown .selected-text');
    const destinationText = document.querySelector('#destination-dropdown .selected-text');
    
    // 保存當前的文字內容
    const tempText = departureText.textContent;
    const tempClass = departureText.className;
    
    // 交換文字內容
    departureText.textContent = destinationText.textContent;
    departureText.className = destinationText.className;
    destinationText.textContent = tempText;
    destinationText.className = tempClass;
    
    // 如果兩邊都是「請選擇」，保持 text-muted 類
    if (departureText.textContent === '請選擇') {
        departureText.classList.add('text-muted');
    }
    if (destinationText.textContent === '請選擇') {
        destinationText.classList.add('text-muted');
    }
} 