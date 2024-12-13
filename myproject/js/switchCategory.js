document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const images = document.querySelectorAll('.image-wrapper .image');

    const categoryData = {
        0: [
            'https://via.placeholder.com/300x200?text=Category0-1',
            'https://via.placeholder.com/300x200?text=Category0-2',
            'https://via.placeholder.com/300x200?text=Category0-3',
            'https://via.placeholder.com/300x200?text=Category0-4',
            'https://via.placeholder.com/300x200?text=Category0-5',
            'https://via.placeholder.com/300x200?text=Category0-6'
        ],
        1: [
            'https://via.placeholder.com/300x200?text=Category1-1',
            'https://via.placeholder.com/300x200?text=Category1-2',
            'https://via.placeholder.com/300x200?text=Category1-3',
            'https://via.placeholder.com/300x200?text=Category1-4',
            'https://via.placeholder.com/300x200?text=Category1-5',
            'https://via.placeholder.com/300x200?text=Category1-6'
        ],
        // 其他類別的圖片資料
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