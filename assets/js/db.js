/**
 * Centralized Data Management for Premium Store
 * Handles localStorage persistence for Products, Users, and Orders
 */

const STORAGE_KEYS = {
    PRODUCTS: 'ps_products',
    USERS: 'ps_users',
    ORDERS: 'ps_orders',
    CURRENT_USER: 'ps_current_user'
};

const INITIAL_PRODUCTS = [
    { id: 1, name: "iPhone 15 Pro", category: "Phones", price: 12000000, oldPrice: 13500000, rating: 5, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80", description: "Apple's latest flagship with Titanium design.", stock: 15, isNew: true, isPopular: true },
    { id: 2, name: "MacBook Pro M3", category: "Laptops", price: 22000000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", description: "Most powerful MacBook ever.", stock: 8, isNew: true, isPopular: true },
    { id: 3, name: "AirPods Pro 2", category: "Audio", price: 3000000, oldPrice: 3500000, rating: 4, image: "https://images.unsplash.com/photo-1588423770574-910ae27b85a5?w=500&q=80", description: "Noise cancelling wireless earbuds.", stock: 45, isNew: false, isPopular: true },
    { id: 4, name: "Apple Watch Series 9", category: "Smart Watches", price: 5500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1434493907317-a46b5bc78344?w=500&q=80", description: "Smarter, brighter, mightier.", stock: 20, isNew: true, isPopular: false },
    { id: 5, name: "Samsung Galaxy S24 Ultra", category: "Phones", price: 15000000, oldPrice: 16000000, rating: 5, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", description: "AI-powered flagship experience.", stock: 12, isNew: true, isPopular: true },
    { id: 6, name: "Sony WH-1000XM5", category: "Audio", price: 4500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", description: "Industry leading noise cancellation.", stock: 18, isNew: false, isPopular: true },
    { id: 7, name: "Dell XPS 15", category: "Laptops", price: 18000000, oldPrice: 20000000, rating: 4, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", description: "Breathtaking display and performance.", stock: 5, isNew: false, isPopular: false },
    { id: 8, name: "Logitech MX Master 3S", category: "Accessories", price: 1200000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", description: "The ultimate tool for creators.", stock: 30, isNew: false, isPopular: true },
    { id: 16, name: "DJI Mini 4 Pro", category: "Gaming", price: 11000000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80", description: "Small drone, big features.", stock: 5, isNew: true, isPopular: true },
    { id: 19, name: "Nintendo Switch OLED", category: "Gaming", price: 4500000, oldPrice: 5000000, rating: 5, image: "https://images.unsplash.com/photo-1590514197327-040f7d56e077?w=500&q=80", description: "Vibrant OLED screen.", stock: 10, isNew: false, isPopular: true },
    { id: 32, name: "PS5 Console", category: "Gaming", price: 6500000, oldPrice: 7500000, rating: 5, image: "https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?w=500&q=80", description: "Next-gen gaming experience.", stock: 20, isNew: false, isPopular: true }
];

// Mass Generator for 49 items per category
const CATEGORIES_TO_EXPAND = ['Phones', 'Laptops', 'Audio', 'Gaming'];
const CATEGORY_NAMES = {
    'Phones': 'Telefon', 'Laptops': 'Noutbuk', 'Audio': 'Audio Quloqchin', 'Gaming': 'Geyming Gadjet'
};
const MOCK_IMAGES = {
    'Phones': ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=500', 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500', 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500'],
    'Laptops': ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500'],
    'Audio': ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'https://images.unsplash.com/photo-1546435770-a3e426da473b?w=500', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500', 'https://images.unsplash.com/photo-1583333222044-28fce5bb099c?w=500'],
    'Gaming': ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500', 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500', 'https://images.unsplash.com/photo-1593305841991-05c297ba326b?w=500']
};

let currentId = 100;
CATEGORIES_TO_EXPAND.forEach(cat => {
    const existingCount = INITIAL_PRODUCTS.filter(p => p.category === cat).length;
    for (let i = existingCount + 1; i <= 49; i++) {
        // Base prices per category
        const basePrice = cat === 'Phones' ? 5000000 : cat === 'Laptops' ? 10000000 : cat === 'Audio' ? 500000 : 2000000;
        // Incremental pricing: higher versions are more expensive
        const modelPremium = i * (cat === 'Phones' ? 200000 : cat === 'Laptops' ? 300000 : cat === 'Audio' ? 20000 : 50000);
        const finalPrice = basePrice + modelPremium;
        
        // Use a unique Unsplash sig ID to ensure unique images
        const unsplashIds = {
            'Phones': 'smartphone', 'Laptops': 'laptop', 'Audio': 'headphones', 'Gaming': 'gaming'
        };
        const uniqueImage = `https://images.unsplash.com/photo-15${Math.floor(Math.random()*9000000000 + 1000000000)}?w=500&q=80&sig=${currentId}`;
        
        // ActuallyUnsplash generic queries are better for variety
        const searchTerms = {
            'Phones': 'iphone', 'Laptops': 'macbook', 'Audio': 'headphones', 'Gaming': 'console'
        };
        const randomImage = `https://source.unsplash.com/featured/500x500?${searchTerms[cat]}&sig=${currentId}`;
        // Wait, source.unsplash.com is deprecated. Let's use the reliable unsplash.com/photo- IDs or keywords with random sig.
        // Modern Unsplash random: https://images.unsplash.com/photo-...?auto=format&fit=crop&w=500&q=60
        // Actually, let's just use keywords and a large pool.
        
        INITIAL_PRODUCTS.push({
            id: currentId++,
            name: `${CATEGORY_NAMES[cat]} Premium V-${i}`,
            category: cat,
            price: finalPrice,
            oldPrice: finalPrice * 1.15,
            rating: Math.floor(Math.random() * 2) + 4,
            image: `https://loremflickr.com/500/500/${cat.toLowerCase()}?lock=${currentId}`, // LoremFlickr is very reliable for variety
            description: `Yuqori sifatli va zamonaviy ${CATEGORY_NAMES[cat]} siz uchun. Eng so'nggi texnologiyalar bilan jihozlangan.`,
            stock: Math.floor(Math.random() * 50) + 5,
            isNew: i > 40,
            isPopular: i % 5 === 0
        });
    }
});

const CURRENT_DB_VERSION = 4; // Bumped to 4 for unique images and pricing

const db = {
    // Products
    getProducts: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        const version = localStorage.getItem('db_version');
        
        if (!stored || version != CURRENT_DB_VERSION) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
            localStorage.setItem('db_version', CURRENT_DB_VERSION);
            return INITIAL_PRODUCTS;
        }
        return JSON.parse(stored);
    },
    saveProducts: (products) => {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    },
    addProduct: (product) => {
        const products = db.getProducts();
        product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push(product);
        db.saveProducts(products);
        return product;
    },
    updateProduct: (updatedProduct) => {
        const products = db.getProducts().map(p => p.id === updatedProduct.id ? updatedProduct : p);
        db.saveProducts(products);
    },
    deleteProduct: (id) => {
        const products = db.getProducts().filter(p => p.id !== id);
        db.saveProducts(products);
    },

    // Users
    getUsers: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS);
        return stored ? JSON.parse(stored) : [];
    },
    registerUser: (user) => {
        const users = db.getUsers();
        user.id = Date.now();
        user.joinedDate = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
        users.push(user);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return user;
    },

    // Export to CSV for Excel
    exportUsersToCSV: () => {
        const users = db.getUsers();
        if (users.length === 0) return alert("Hozircha foydalanuvchilar yo'q.");

        const headers = ["ID", "Ism", "Email", "Telefon", "Ro'yxatdan o'tgan sana"];
        const rows = users.map(u => [u.id, u.name, u.email, u.phone || "Kiritilmagan", u.joinedDate]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "foydalanuvchilar.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Auto-init products if empty
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    db.getProducts();
}
