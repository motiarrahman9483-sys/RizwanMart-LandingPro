/*=========================================
Rizwan Mart Landing Pro
script.js
Version 2.0 (Pro Optimized)
=========================================*/

// গুগল শিটের ওয়েব অ্যাপ লিংক
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhp7HiV_X7N1LuHh5Kdk5oR5yI89UwdamS-8UTI9QBu9f-44ApzXuC7vZTNgf8IJ2a/exec";

document.addEventListener("DOMContentLoaded", () => {
    // PRODUCT অবজেক্ট আছে কি না তা চেক করা হচ্ছে
    if (typeof PRODUCT !== 'undefined') {
        loadProduct();
        loadGallery();
        loadFeatures();
        loadPackages();
        loadReviews();
        loadFAQ();
        initAutoImageSlider();
        initStockAndSold();
    } else {
        console.error("Error: PRODUCT object is missing!");
    }

    initOrderButton();
    initGalleryClick();
    initOrderForm();
    updateFooterYear();
});

/*=========================
Helper Functions
=========================*/
// নিরাপদে টেক্সট বসানোর জন্য ছোট হেল্পার ফাংশন
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

/*=========================
Product Information
=========================*/
function loadProduct() {
    document.title = `${PRODUCT.brand} | ${PRODUCT.name}`;
    
    safeSetText("productName", PRODUCT.name);
    safeSetText("productShort", PRODUCT.shortDescription);
    safeSetText("price", PRODUCT.price);
    safeSetText("oldPrice", PRODUCT.oldPrice);

    const mainImage = document.getElementById("mainImage");
    if (mainImage && PRODUCT.images?.length > 0) {
        mainImage.src = PRODUCT.images[0];
    }
}

/*=========================
Gallery
=========================*/
function loadGallery() {
    const gallery = document.querySelector(".gallery-grid");
    if (!gallery || !PRODUCT.images) return;

    // DOM Thrashing রোধ করতে ভেরিয়েবলে ডাটা স্টোর করা হচ্ছে
    let htmlContent = "";
    PRODUCT.images.forEach(img => {
        htmlContent += `<img src="${img}" class="gallery-image" alt="Product Image">`;
    });
    gallery.innerHTML = htmlContent;
}

/*=========================
Gallery Click
=========================*/
function initGalleryClick() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("gallery-image")) {
            const mainImage = document.getElementById("mainImage");
            if (mainImage) mainImage.src = e.target.src;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}

/*=========================
Features
=========================*/
function loadFeatures() {
    const feature = document.querySelector(".feature-grid");
    if (!feature || !PRODUCT.features) return;

    let htmlContent = "";
    PRODUCT.features.forEach(item => {
        htmlContent += `<div class="card"><h3>✔ ${item}</h3></div>`;
    });
    feature.innerHTML = htmlContent;
}

/*=========================
Packages
=========================*/
function loadPackages() {
    const box = document.querySelector(".package-grid");
    if (!box || !PRODUCT.packages) return;

    let htmlContent = "";
    PRODUCT.packages.forEach((item, index) => {
        htmlContent += `
        <div class="package ${index === 1 ? 'popular' : ''}">
            ${index === 1 ? '<span>BEST SELLER</span>' : ''}
            <h3>${item.name}</h3>
            <h2>৳ ${item.price}</h2>
        </div>`;
    });
    box.innerHTML = htmlContent;
}

/*=========================
Reviews
=========================*/
function loadReviews() {
    const review = document.querySelector(".reviews .container");
    if (!review || !PRODUCT.reviews) return;

    let htmlContent = "<h2>Customer Reviews</h2>";
    PRODUCT.reviews.forEach(item => {
        // rating এর নাম্বার অনুযায়ী ডায়নামিক স্টার তৈরি
        const stars = "⭐".repeat(item.rating); 
        
        htmlContent += `
        <div class="review-box">
            ${stars}
            <p>${item.text}</p>
            <strong>${item.name}</strong>
        </div>`;
    });
    review.innerHTML = htmlContent;
}

/*=========================
FAQ
=========================*/
function loadFAQ() {
    const faq = document.querySelector(".faq .container");
    if (!faq || !PRODUCT.faq) return;

    let htmlContent = "<h2>Frequently Asked Questions</h2>";
    PRODUCT.faq.forEach(item => {
        htmlContent += `
        <div class="faq-item">
            <h3>${item.q}</h3>
            <p>${item.a}</p>
        </div>`;
    });
    faq.innerHTML = htmlContent;
}

/*=========================
Order Button
=========================*/
function initOrderButton() {
    const buttons = document.querySelectorAll(".buy-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const orderSection = document.getElementById("order");
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

/*=========================
Order Form (Google Sheets Integration)
=========================*/
function initOrderForm() {
    const form = document.getElementById("orderForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // সাবমিট বাটনের স্টেট পরিবর্তন
        const submitBtn = this.querySelector("button[type=submit]") || this.querySelector("input[type=submit]");
        let originalBtnText = "অর্ডার করুন";
        
        if (submitBtn) {
            originalBtnText = submitBtn.innerText || submitBtn.value;
            if (submitBtn.innerText) submitBtn.innerText = "অর্ডার প্রসেস হচ্ছে...";
            else submitBtn.value = "অর্ডার প্রসেস হচ্ছে...";
            submitBtn.disabled = true;
        }

        // ফর্ম ডাটা সংগ্রহ
        const requestBody = new FormData(form);

        // Fetch API ব্যবহার করে ডাটা পাঠানো
        fetch(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            body: requestBody 
        })
        .then(response => {
            alert("ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।");
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("দুঃখিত, কোনো সমস্যা হয়েছে। দয়া করে আপনার ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।");
        })
        .finally(() => {
            // বাটন আবার আগের অবস্থায় ফিরিয়ে আনা
            if (submitBtn) {
                if (submitBtn.innerText) submitBtn.innerText = originalBtnText;
                else submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });
}

/*=========================
Auto Image Slider
=========================*/
function initAutoImageSlider() {
    const mainImage = document.getElementById("mainImage");
    if (!mainImage || !PRODUCT.images || PRODUCT.images.length === 0) return;

    let currentImage = 0;
    setInterval(() => {
        currentImage++;
        if (currentImage >= PRODUCT.images.length) {
            currentImage = 0;
        }
        mainImage.src = PRODUCT.images[currentImage];
    }, 4000);
}

/*=========================
Stock & Sold Counter
=========================*/
function initStockAndSold() {
    console.log("Stock:", PRODUCT.stock || 0);
    console.log("Sold:", PRODUCT.sold || 0);
}

/*=========================
Current Year
=========================*/
function updateFooterYear() {
    const footerText = document.querySelector("footer p");
    if (footerText) {
        const year = new Date().getFullYear();
        const brand = typeof PRODUCT !== 'undefined' ? PRODUCT.brand : 'Rizwan Mart';
        footerText.innerHTML = `© ${year} ${brand} | All Rights Reserved`;
    }
}
