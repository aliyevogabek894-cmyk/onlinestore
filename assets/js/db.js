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
    { id: 3, name: "AirPods Pro 2", category: "Accessories", price: 3000000, oldPrice: 3500000, rating: 4, image: "https://images.unsplash.com/photo-1588423770574-910ae27b85a5?w=500&q=80", description: "Noise cancelling wireless earbuds.", stock: 45, isNew: false, isPopular: true },
    { id: 4, name: "Apple Watch Series 9", category: "Smart Watches", price: 5500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1434493907317-a46b5bc78344?w=500&q=80", description: "Smarter, brighter, mightier.", stock: 20, isNew: true, isPopular: false },
    { id: 5, name: "Samsung Galaxy S24 Ultra", category: "Phones", price: 15000000, oldPrice: 16000000, rating: 5, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", description: "AI-powered flagship experience.", stock: 12, isNew: true, isPopular: true },
    { id: 6, name: "Sony WH-1000XM5", category: "Accessories", price: 4500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", description: "Industry leading noise cancellation.", stock: 18, isNew: false, isPopular: true },
    { id: 7, name: "Dell XPS 15", category: "Laptops", price: 18000000, oldPrice: 20000000, rating: 4, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", description: "Breathtaking display and performance.", stock: 5, isNew: false, isPopular: false },
    { id: 8, name: "Logitech MX Master 3S", category: "Accessories", price: 1200000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", description: "The ultimate tool for creators.", stock: 30, isNew: false, isPopular: true },
    { id: 9, name: "iPad Air M2", category: "Laptops", price: 8500000, oldPrice: 9500000, rating: 5, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", description: "Fast, thin, and versatile.", stock: 15, isNew: true, isPopular: false },
    { id: 10, name: "Kindle Paperwhite", category: "Accessories", price: 1800000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1594980596229-6aad95ac835a?w=500&q=80", description: "Read anywhere, anytime.", stock: 25, isNew: false, isPopular: false },
    { id: 11, name: "GoPro Hero 12", category: "Accessories", price: 5000000, oldPrice: 5500000, rating: 5, image: "https://images.unsplash.com/photo-1526170315870-ef682c535476?w=500&q=80", description: "Best-in-class stabilization.", stock: 10, isNew: true, isPopular: true },
    { id: 12, name: "Ninja Air Fryer", category: "Accessories", price: 2500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1621360841013-c27774ef50bc?w=500&q=80", description: "Healthy meals in minutes.", stock: 20, isNew: false, isPopular: false },
    { id: 13, name: "Bose QuietComfort", category: "Accessories", price: 3800000, oldPrice: 4200000, rating: 4, image: "https://images.unsplash.com/photo-1546435770-a3e426da473b?w=500&q=80", description: "Legendary silence.", stock: 12, isNew: false, isPopular: true },
    { id: 14, name: "Mechanical Keyboard", category: "Accessories", price: 1500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80", description: "RGB Gaming Keyboard.", stock: 20, isNew: true, isPopular: false },
    { id: 15, name: "Garmin Fenix 7", category: "Smart Watches", price: 7500000, oldPrice: 8000000, rating: 5, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", description: "Ultimate multisport GPS watch.", stock: 7, isNew: false, isPopular: true },
    { id: 16, name: "DJI Mini 4 Pro", category: "Accessories", price: 11000000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80", description: "Small drone, big features.", stock: 5, isNew: true, isPopular: true },
    { id: 17, name: "Asus ROG Zephyrus", category: "Laptops", price: 25000000, oldPrice: 28000000, rating: 5, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", description: "High-end gaming laptop.", stock: 3, isNew: true, isPopular: false },
    { id: 18, name: "SteelSeries Arctis 7", category: "Accessories", price: 2200000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1618366712214-8c0751893041?w=500&q=80", description: "Wireless gaming headset.", stock: 15, isNew: false, isPopular: false },
    { id: 19, name: "Nintendo Switch OLED", category: "Electronics", price: 4500000, oldPrice: 5000000, rating: 5, image: "https://images.unsplash.com/photo-1590514197327-040f7d56e077?w=500&q=80", description: "Vibrant OLED screen.", stock: 10, isNew: false, isPopular: true },
    { id: 20, name: "Sonos Era 100", category: "Accessories", price: 3200000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80", description: "Rich, room-filling sound.", stock: 22, isNew: true, isPopular: false }
];

const db = {
    // Products
    getProducts: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
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
        user.joinedDate = new Date().toLocaleDateString();
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
