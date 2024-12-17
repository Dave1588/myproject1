document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const images = document.querySelectorAll('.image-wrapper .image');

    const categoryData = {
        0: [ // 台灣
            './img/card0/xi.jpg', 
            './img/card0/taipei101.jpg', 
            './img/card0/taroko.avif',
            './img/card0/sunmoon.avif',
            './img/card0/train.avif',
            './img/card0/kendin.avif'  
        ],
        1: [ // 日本
            './img/card1/fuji.jpg', // 富士山
            './img/card1/kyoto.jpg', // 京都清水寺
            './img/card1/osaka.jpg', // 大阪城
            './img/card1/disneyland.jpg', // 東京迪士尼
            './img/card1/deer.avif', // 奈良公園
            './img/card1/hotspring.avif'  // 箱根溫泉
        ],
        2: [ // 韓國
            './img/card2/tower.jpg', // 南山首爾塔
            './img/card2/gong.avif', // 景福宮
            './img/card2/world.jpg', // 樂天世界
            './img/card3/island.avif', // 南怡島
            './img/card3/myeongdong.jpg', // 明洞
            './img/card2/jeju.jpg'  // 濟州島
        ],
        3: [ // 大陸港澳
            './img/card3/disney.avif', // 香港迪士尼
            './img/card3/macou.jpg', // 澳門威尼斯人
            './img/card3/shanghai.jpg', // 上海外灘
            './img/card3/beijing.jpg', // 北京長城
            './img/card3/xiang.avif', // 西安兵馬俑
            './img/card3/river.jpg'  // 桂林山水
        ],
        4: [ // 歐洲
            './img/card4/ifletower.jpg', // 巴黎鐵塔
            './img/card4/rome.jpg', // 羅馬競技場
            './img/card4/venice.jpg', // 威尼斯
            './img/card4/holan.jpg', // 阿姆斯特丹
            './img/card4/swiss.jpg', // 少女峰
            './img/card4/bluswhite.jpg'  // 聖托里尼
        ]
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            updateImages(category);
        });
    });

    function updateImages(category) {
        const data = categoryData[category];
        console.log('Updating images for category:', category);
        console.log('Image data:', data);
        
        images.forEach((img, index) => {
            const imageUrl = data[index];
            console.log(`Setting image ${index} to:`, imageUrl);
            img.style.backgroundImage = `url('${imageUrl}')`;
        });
    }

    // 添加初始化
    updateImages('0'); // 預設顯示第一個分類的圖片
}); 