const Product = {
    men: ['Shirt', 'Pant', 'Jacket'],
    women: ['Dress', 'Skirt', 'Blouse'],
    watches: ['Titan', 'Rolex', 'Omega']
};
const categoryElements = document.querySelectorAll('.product-menu');
const productList = document.getElementById('product-grid');

function showProducts(category){
    productList.innerHTML = '';

    const categoryProducts = Product-container[category];

    categoryProducts.forEach(element => {
        const productItem = document.createElement('p');
        productItem.textContent = product;
        productList.appendChild(productItem);
    });
}
categoryElements.forEach(categoryElements => {
    categoryElements.addEventListener('click', () => {
        const category = categoryElement.getAttribute('data-category');
        showProducts(category);
    });
});