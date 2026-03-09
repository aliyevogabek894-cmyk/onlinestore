// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    // Get products from central DB
    const allProducts = typeof db !== 'undefined' ? db.getProducts() : [];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    if (typeof showNotification === 'function') {
        showNotification(`${product.name} savatga qo'shildi!`);
    } else {
        alert(`${product.name} savatga qo'shildi!`);
    }
}

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
