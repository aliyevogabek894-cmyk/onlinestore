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
    { id: 9, name: "iPad Air M2", category: "Laptops", price: 8500000, oldPrice: 9500000, rating: 5, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", description: "Fast, thin, and versatile.", stock: 15, isNew: true, isPopular: false },
    { id: 10, name: "Kindle Paperwhite", category: "E-Readers", price: 1800000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1594980596229-6aad95ac835a?w=500&q=80", description: "Read anywhere, anytime.", stock: 25, isNew: false, isPopular: false },
    { id: 11, name: "GoPro Hero 12", category: "Cameras", price: 5000000, oldPrice: 5500000, rating: 5, image: "https://images.unsplash.com/photo-1526170315870-ef682c535476?w=500&q=80", description: "Best-in-class stabilization.", stock: 10, isNew: true, isPopular: true },
    { id: 12, name: "Ninja Air Fryer", category: "Home Tech", price: 2500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1621360841013-c27774ef50bc?w=500&q=80", description: "Healthy meals in minutes.", stock: 20, isNew: false, isPopular: false },
    { id: 13, name: "Bose QuietComfort", category: "Audio", price: 3800000, oldPrice: 4200000, rating: 4, image: "https://images.unsplash.com/photo-1546435770-a3e426da473b?w=500&q=80", description: "Legendary silence.", stock: 12, isNew: false, isPopular: true },
    { id: 14, name: "Mechanical Keyboard", category: "Accessories", price: 1500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80", description: "RGB Gaming Keyboard.", stock: 20, isNew: true, isPopular: false },
    { id: 15, name: "Garmin Fenix 7", category: "Smart Watches", price: 7500000, oldPrice: 8000000, rating: 5, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", description: "Ultimate multisport GPS watch.", stock: 7, isNew: false, isPopular: true },
    { id: 16, name: "DJI Mini 4 Pro", category: "Gaming", price: 11000000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80", description: "Small drone, big features.", stock: 5, isNew: true, isPopular: true },
    { id: 17, name: "Asus ROG Zephyrus", category: "Laptops", price: 25000000, oldPrice: 28000000, rating: 5, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", description: "High-end gaming laptop.", stock: 3, isNew: true, isPopular: false },
    { id: 18, name: "SteelSeries Arctis 7", category: "Audio", price: 2200000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1618366712214-8c0751893041?w=500&q=80", description: "Wireless gaming headset.", stock: 15, isNew: false, isPopular: false },
    { id: 19, name: "Nintendo Switch OLED", category: "Gaming", price: 4500000, oldPrice: 5000000, rating: 5, image: "https://images.unsplash.com/photo-1590514197327-040f7d56e077?w=500&q=80", description: "Vibrant OLED screen.", stock: 10, isNew: false, isPopular: true },
    { id: 20, name: "Sonos Era 100", category: "Audio", price: 3200000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80", description: "Rich, room-filling sound.", stock: 22, isNew: true, isPopular: false },
    { id: 21, name: "Xiaomi 14 Ultra", category: "Phones", price: 11500000, oldPrice: 13000000, rating: 5, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80", description: "Leica optics camera mobile.", stock: 20, isNew: true, isPopular: false },
    { id: 22, name: "HP Spectre x360", category: "Laptops", price: 16500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80", description: "Convertible laptop for professionals.", stock: 10, isNew: false, isPopular: false },
    { id: 23, name: "JBL Flip 6", category: "Audio", price: 1500000, oldPrice: 1800000, rating: 5, image: "https://images.unsplash.com/photo-1612441304227-09d949442004?w=500&q=80", description: "Portable waterproof speaker.", stock: 40, isNew: false, isPopular: true },
    { id: 24, name: "Huawei Watch GT 4", category: "Smart Watches", price: 3200000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1508685096489-7aac29m25346?w=500&q=80", description: "Elegant design and health tracking.", stock: 15, isNew: true, isPopular: false },
    { id: 25, name: "Google Pixel 8 Pro", category: "Phones", price: 10500000, oldPrice: 12000000, rating: 5, image: "https://images.unsplash.com/photo-1610662369660-ed83e1f74cf5?w=500&q=80", description: "The best of Google engineering.", stock: 18, isNew: true, isPopular: false },
    { id: 26, name: "Razer DeathAdder V3", category: "Gaming", price: 850000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", description: "Ultralight gaming mouse.", stock: 35, isNew: false, isPopular: true },
    { id: 27, name: "Alienware 34 Curved", category: "Gaming", price: 12000000, oldPrice: 14000000, rating: 5, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", description: "QD-OLED Gaming Monitor.", stock: 4, isNew: true, isPopular: false },
    { id: 28, name: "Keychron K6", category: "Accessories", price: 950000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", description: "Compact wireless mechanical keyboard.", stock: 25, isNew: false, isPopular: false },
    { id: 29, name: "Canon EOS R6", category: "Cameras", price: 28000000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", description: "Mirrorless camera for creators.", stock: 6, isNew: false, isPopular: false },
    { id: 30, name: "Dyson V15 Detect", category: "Home Tech", price: 8500000, oldPrice: 9500000, rating: 5, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80", description: "Most powerful cordless vacuum.", stock: 12, isNew: true, isPopular: false },
    { id: 31, name: "Marshall Kilburn II", category: "Audio", price: 3500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80", description: "Classic rock style speaker.", stock: 14, isNew: false, isPopular: false },
    { id: 32, name: "PS5 Console", category: "Gaming", price: 6500000, oldPrice: 7500000, rating: 5, image: "https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?w=500&q=80", description: "Next-gen gaming experience.", stock: 20, isNew: false, isPopular: true },
    { id: 33, name: "Xbox Series X", category: "Gaming", price: 6200000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80", description: "The most powerful Xbox ever.", stock: 15, isNew: false, isPopular: false },
    { id: 34, name: "Nothing Phone (2)", category: "Phones", price: 7500000, oldPrice: 8500000, rating: 4, image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80", description: "Unique glyph interface smartphone.", stock: 22, isNew: true, isPopular: false },
    { id: 35, name: "Insta360 X3", category: "Cameras", price: 5800000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1526170315870-ef682c535476?w=500&q=80", description: "360-degree action camera.", stock: 10, isNew: true, isPopular: false },
    { id: 36, name: "Philips Hue Starter Kit", category: "Home Tech", price: 1800000, oldPrice: 2200000, rating: 5, image: "https://images.unsplash.com/photo-1550985543-f47f38aee65e?w=500&q=80", description: "Smart lighting for your home.", stock: 30, isNew: false, isPopular: false },
    { id: 37, name: "Fitbit Charge 6", category: "Smart Watches", price: 2100000, oldPrice: null, rating: 4, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80", description: "Advanced fitness tracker.", stock: 25, isNew: true, isPopular: false },
    { id: 38, name: "Corsair Virtuoso RGB", category: "Audio", price: 2800000, oldPrice: 3200000, rating: 5, image: "https://images.unsplash.com/photo-1618366712214-8c0751893041?w=500&q=80", description: "High-fidelity gaming headset.", stock: 15, isNew: false, isPopular: false },
    { id: 39, name: "Elgato Stream Deck", category: "Accessories", price: 1900000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", description: "Perfect tool for streamers.", stock: 12, isNew: false, isPopular: false },
    { id: 40, name: "Nanoleaf Shapes", category: "Home Tech", price: 2900000, oldPrice: 3500000, rating: 5, image: "https://images.unsplash.com/photo-1550985543-f47f38aee65e?w=500&q=80", description: "Modular wall lighting panels.", stock: 8, isNew: true, isPopular: false },
    { id: 41, name: "Apple iMac 24-inch", category: "Laptops", price: 18500000, oldPrice: null, rating: 5, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", description: "Colorful all-in-one desktop.", stock: 5, isNew: true, isPopular: false },
    { id: 42, name: "Soundcore Liberty 4", category: "Audio", price: 1200000, oldPrice: 1500000, rating: 4, image: "https://images.unsplash.com/photo-1588423770574-910ae27b85a5?w=500&q=80", description: "True wireless earbuds with heart rate sensor.", stock: 35, isNew: false, isPopular: false }
];

const CURRENT_DB_VERSION = 2; // Incremented to force update to 40+ products

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
