    let currentIndex = 0; // 目前顯示的起始位置
    const totalCards = 9; // 總卡片數量
    const cardsToShow = 3; // 每次顯示的卡片數量
    const carousel = document.querySelector('#cardcarousel .carousel');
    const cardWidth = document.querySelector('.card').offsetWidth + 20; // 每個卡片寬度加上間距

    function moveLeft() {
      // 向左移動兩個卡片
      if (currentIndex <= 0) {
        currentIndex = totalCards - cardsToShow; // 循環回最後
      } else {
        currentIndex -= 3; // 向左移動
      }
      updateCarousel();
    }

    function moveRight() {
      // 向右移動兩個卡片
      if (currentIndex >= totalCards - cardsToShow) {
        currentIndex = 0; // 循環回到開頭
      } else {
        currentIndex += 3; // 向右移動
      }
      updateCarousel();
    }

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function resetCarousel() {
      currentIndex = 0; // 重設起始位置
      updateCarousel(); // 更新顯示
    }

    // 假設你有一個分類按鈕的事件監聽器
    document.querySelectorAll('#myTab .nav-link').forEach(button => {
      button.addEventListener('click', resetCarousel); // 點擊時重設
    });