document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const largeImage = document.getElementById('large-image');
    const smallImages = document.querySelectorAll('.small-images-wrapper .col');

    const categoryData = {
        0: {
            largeImage: './img/category0/large-image.jpg',
            smallImages: ['./img/category0/small-image1.jpg', './img/category0/small-image2.jpg', './img/category0/small-image3.jpg', './img/category0/small-image4.jpg']
        },
        1: {
            largeImage: './img/category0/small-image1.jpg',
            smallImages: ['./img/category0/small-image2.jpg', './img/category0/small-image3.jpg', './img/category0/small-image4.jpg', './img/category0/large-image.jpg']
        },
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
        
        largeImage.style.backgroundImage = `url('${data.largeImage}')`;
        
        smallImages.forEach((img, index) => {
            img.querySelector('.small-image').style.backgroundImage = `url('${data.smallImages[index]}')`;
        });
    }
}); 