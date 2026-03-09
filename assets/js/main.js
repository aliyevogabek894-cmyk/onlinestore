// Product Data
const products = [
    {
        id: 1,
        name: "Premium Smart Soat",
        price: 1200000,
        category: "Elektronika",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        description: "Eng so'nggi texnologiyalar bilan jihozlangan premium smart soat."
    },
    {
        id: 2,
        name: "Charm Hamyon",
        price: 250000,
        category: "Aksessuarlar",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
        description: "Tabiiy charmdan tayyorlangan sifatli hamyon."
    },
    {
        id: 3,
        name: "Simsiz Quloqchinlar",
        price: 450000,
        category: "Elektronika",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        description: "Kristalldek tiniq ovoz va qulay dizayn."
    },
    {
        id: 4,
        name: "Fotoapparat Retro",
        price: 3500000,
        category: "Elektronika",
        image: "https://images.unsplash.com/photo-1526170315870-ef682c535476?w=500&q=80",
        description: "Retro uslubidagi zamonaviy fotoapparat."
    }
];

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    showNotification(`${product.name} savatga qo'shildi!`);
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
