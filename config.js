/*=========================================
Rizwan Mart Landing Pro
config.js (Pro Optimized)
=========================================*/

const PRODUCT = {
    // =========================
    // Brand Information
    // =========================
    brand: "Rizwan Mart",
    phone: "8801700000000",
    whatsapp: "8801700000000",
    messenger: "https://m.me/yourpage",
    facebook: "https://facebook.com/yourpage",

    // =========================
    // Product Information
    // =========================
    name: "Premium Product Name",
    shortDescription: "Write your short product description here.",
    price: 499,
    oldPrice: 799,
    discount: "38% OFF",
    stock: 26,
    sold: 451,
    deliveryInside: 80,
    deliveryOutside: 130,

    // =========================
    // Images
    // =========================
    images: [
        "assets/images/product1.jpg",
        "assets/images/product2.jpg",
        "assets/images/product3.jpg",
       "assets/images/product4.jpg"
        "assets/images/product4.jpg"
    ],

    // =========================
    // Product Features
    // =========================
    features: [
        "Premium Quality",
        "Easy To Use",
        "Long Lasting",
        "Cash On Delivery",
        "Fast Delivery",
        "Best Price"
    ],

    // =========================
    // Package
    // =========================
    packages: [
        {
            name: "1 Piece",
            price: 499
        },
        {
            name: "2 Pieces",
            price: 899
        },
        {
            name: "3 Pieces",
            price: 1299
        }
    ],

    // =========================
    // Customer Reviews
    // =========================
    reviews: [
        {
            name: "Rahim",
            rating: 5, // এই রেটিং অনুযায়ী স্টার প্রিন্ট করা যাবে
            text: "Excellent Product."
        },
        {
            name: "Karim",
            rating: 4, // উদাহরণস্বরূপ এখানে ৪ দিলাম
            text: "Very Good Quality."
        }
    ],

    // =========================
    // FAQ
    // =========================
    faq: [
        {
            q: "ডেলিভারি কত দিনে?",
            a: "২-৫ কার্যদিবস।"
        },
        {
            q: "ক্যাশ অন ডেলিভারি আছে?",
            a: "জি, সারা বাংলাদেশে।"
        }
    ]
};

// প্রো-টিপ: অবজেক্টটিকে ফ্রীজ করে দেওয়া হলো, যাতে রানটাইমে ডেটা পরিবর্তন না হয় (Security Practice)
Object.freeze(PRODUCT);
