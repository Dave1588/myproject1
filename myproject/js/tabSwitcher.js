// // 定義每個分類的 Carousel 資料
// const categories = {
//     1: [
//       { img: "https://via.placeholder.com/300x200", title: "目的地 1", text: "這是目的地 1 的介紹文字。" },
//       { img: "https://via.placeholder.com/300x200/ff0000", title: "目的地 2", text: "這是目的地 2 的介紹文字。" },
//     ],
//     2: [
//       { img: "https://via.placeholder.com/300x200/00ff00", title: "目的地 A", text: "這是目的地 A 的介紹文字。" },
//       { img: "https://via.placeholder.com/300x200/0000ff", title: "目的地 B", text: "這是目的地 B 的介紹文字。" },
//     ],
//     3: [
//       { img: "https://via.placeholder.com/300x200/ff00ff", title: "目的地 X", text: "這是目的地 X 的介紹文字。" },
//       { img: "https://via.placeholder.com/300x200/00ffff", title: "目的地 Y", text: "這是目的地 Y 的介紹文字。" },
//     ],
//   };

//   // 獲取元素
//   const tabs = document.querySelectorAll("#tabs .nav-link");
//   const carouselContent = document.getElementById("carouselContent");

//   // 更新 Carousel 的內容
//   function updateCarouselContent(category) {
//     const items = categories[category];
//     carouselContent.innerHTML = items
//       .map((item, index) => `
//         <div class="carousel-item ${index === 0 ? "active" : ""}">
//           <div class="card">
//             <img src="${item.img}" class="card-img-top" alt="${item.title}">
//             <div class="card-body">
//               <h5 class="card-title">${item.title}</h5>
//               <p class="card-text">${item.text}</p>
//             </div>
//           </div>
//         </div>
//       `)
//       .join("");
//   }

//   // 綁定 Tab 點擊事件
//   tabs.forEach(tab => {
//     tab.addEventListener("click", () => {
//       // 移除所有 tab 的 active 類
//       tabs.forEach(t => t.classList.remove("active"));
//       // 設定當前 tab 為 active
//       tab.classList.add("active");
//       // 更新 Carousel
//       const category = tab.getAttribute("data-category");
//       updateCarouselContent(category);
//     });
//   });

//   // 預設載入分類一內容
//   updateCarouselContent(1);