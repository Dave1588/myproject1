const categories = [
    {
        largeImage: 'image1-large.jpg',
        smallImages: [
            'image1-small1.jpg',
            'image1-small2.jpg',
            'image1-small3.jpg',
            'image1-small4.jpg'
        ],
        links: ['#link1', '#link2', '#link3', '#link4', '#link5']
    },
    {
        largeImage: 'image2-large.jpg',
        smallImages: [
            'image2-small1.jpg',
            'image2-small2.jpg',
            'image2-small3.jpg',
            'image2-small4.jpg'
        ],
        links: ['#link6', '#link7', '#link8', '#link9', '#link10']
    }
    // 可加入更多分類資料
];

function switchCategory(index) {
    const category = categories[index];
    // 更新大圖片
    document.getElementById('large-image').style.backgroundImage = `url(${category.largeImage})`;
    document.getElementById('large-image').innerHTML = `Large Image [${index + 1}]<br>Size: 800x600`;
    document.getElementById('large-image-link').href = category.links[0];
    
    // 更新小圖片
    category.smallImages.forEach((src, i) => {
        const smallImage = document.getElementById(`small-image-${i + 1}`);
        smallImage.style.backgroundImage = `url(${src})`;
        smallImage.innerHTML = `Small Image [${index + 1}-${i + 1}]<br>Size: 400x300`;
        document.getElementById(`small-image-link-${i + 1}`).href = category.links[i + 1];
    });
}