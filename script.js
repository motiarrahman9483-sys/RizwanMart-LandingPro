/*=========================================
Rizwan Mart Landing Pro
script.js
Version 1.0
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadProduct();

    loadGallery();

    loadFeatures();

    loadPackages();

    loadReviews();

    loadFAQ();

    initOrderButton();

    initGalleryClick();

});

/*=========================
Product Information
=========================*/

function loadProduct(){

    document.title = PRODUCT.brand + " | " + PRODUCT.name;

    document.getElementById("productName").innerText =
        PRODUCT.name;

    document.getElementById("productShort").innerText =
        PRODUCT.shortDescription;

    document.getElementById("price").innerText =
        PRODUCT.price;

    document.getElementById("oldPrice").innerText =
        PRODUCT.oldPrice;

    document.getElementById("mainImage").src =
        PRODUCT.images[0];

}

/*=========================
Gallery
=========================*/

function loadGallery(){

    const gallery =
        document.querySelector(".gallery-grid");

    gallery.innerHTML = "";

    PRODUCT.images.forEach(img=>{

        gallery.innerHTML += `

        <img
        src="${img}"
        class="gallery-image">

        `;

    });

}

/*=========================
Gallery Click
=========================*/

function initGalleryClick(){

    document.addEventListener("click",(e)=>{

        if(e.target.classList.contains("gallery-image")){

            document.getElementById("mainImage").src =
            e.target.src;

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    });

}

/*=========================
Features
=========================*/

function loadFeatures(){

    const feature =
        document.querySelector(".feature-grid");

    feature.innerHTML = "";

    PRODUCT.features.forEach(item=>{

        feature.innerHTML += `

        <div class="card">

        <h3>✔ ${item}</h3>

        </div>

        `;

    });

}

/*=========================
Packages
=========================*/

function loadPackages(){

    const box =
        document.querySelector(".package-grid");

    box.innerHTML = "";

    PRODUCT.packages.forEach((item,index)=>{

        box.innerHTML += `

        <div class="package ${index==1?'popular':''}">

        ${index==1?'<span>BEST SELLER</span>':''}

        <h3>${item.name}</h3>

        <h2>৳ ${item.price}</h2>

        </div>

        `;

    });

}

/*=========================
Reviews
=========================*/

function loadReviews(){

    const review =
        document.querySelector(".reviews .container");

    review.innerHTML="<h2>Customer Reviews</h2>";

    PRODUCT.reviews.forEach(item=>{

        review.innerHTML += `

        <div class="review-box">

        ⭐⭐⭐⭐⭐

        <p>

        ${item.text}

        </p>

        <strong>

        ${item.name}

        </strong>

        </div>

        `;

    });

}

/*=========================
FAQ
=========================*/

function loadFAQ(){

    const faq =
        document.querySelector(".faq .container");

    faq.innerHTML="<h2>Frequently Asked Questions</h2>";

    PRODUCT.faq.forEach(item=>{

        faq.innerHTML += `

        <div class="faq-item">

        <h3>${item.q}</h3>

        <p>${item.a}</p>

        </div>

        `;

    });

}

/*=========================
Order Button
=========================*/

function initOrderButton(){

    const buttons =
        document.querySelectorAll(".buy-btn");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            document
            .getElementById("order")
            .scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*=========================
Order Form
=========================*/

const form =
document.getElementById("orderForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name =
this.querySelector("input[type=text]").value;

const phone =
this.querySelector("input[type=tel]").value;

const address =
this.querySelector("textarea").value;

const quantity =
this.querySelector("select").value;

console.log({

name,

phone,

address,

quantity

});

/*

Google Sheet Connection

Next Version

*/

alert("ধন্যবাদ! আপনার অর্ডার গ্রহণ করা হয়েছে।");

this.reset();

});

}

/*=========================
Auto Image Slider
=========================*/

let currentImage=0;

setInterval(()=>{

currentImage++;

if(currentImage>=PRODUCT.images.length){

currentImage=0;

}

document.getElementById("mainImage").src=
PRODUCT.images[currentImage];

},4000);

/*=========================
Stock Counter
=========================*/

console.log(

"Stock :",

PRODUCT.stock

);

/*=========================
Sold Counter
=========================*/

console.log(

"Sold :",

PRODUCT.sold

);

/*=========================
Current Year
=========================*/

const year=new Date().getFullYear();

document.querySelector("footer p").innerHTML=

"© "+year+" "+PRODUCT.brand+

" | All Rights Reserved";
