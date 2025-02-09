document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const originalSrc = img.src; // ذخیره‌ی تصویر اولیه (placeholder)
                const newSrc = img.getAttribute("data-src");

                // جایگزینی src با data-src
                img.src = newSrc;

                // اگر تصویر جدید لود نشد، تصویر اولیه (پلیس‌هولدر) را برگردان
                img.onerror = function () {
                    img.src = originalSrc;
                };

                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});



const darkbg = document.getElementById("bg-dark-full");

document.addEventListener("click", function (event) {
    const isMegaMenu = event.target.closest(".megamenu-box");
    const isDropdown = event.target.closest(".dropdown-menu");
    const isNavItem = event.target.closest(".nav-item");

    if (!isMegaMenu && !isDropdown && !isNavItem) {
        closeAllMenus();
    }
});

function closeAllMenus() {
    document.querySelectorAll(".megamenu-box, .dropdown-menu").forEach(menu => menu.classList.add("hidden"));
    document.querySelectorAll(".arrowkey-main-navitem").forEach(arrow => arrow.classList.remove("rotate-180"));
    document.querySelectorAll(".arrowkey-main-navitem path").forEach(path => path.classList.remove("fill-secondary"));
    document.querySelectorAll(".nav-item span").forEach(item => item.classList.remove("active-menu-item"));
    darkbg.classList.add("hidden");
}

function toggleMegaMenu(navbarClicked, megaMenuClass) {
    closeAllMenus();
    let megaMenuBox = navbarClicked.closest("li").querySelector(megaMenuClass);
    let arrowKey = navbarClicked.querySelector(".arrowkey-main-navitem");
    
    megaMenuBox.classList.toggle("hidden");
    arrowKey.classList.toggle("rotate-180");
    arrowKey.querySelector("path").classList.toggle("fill-secondary");
    navbarClicked.classList.toggle("active-menu-item");
    darkbg.classList.toggle("hidden", !megaMenuBox.classList.contains("hidden"));
}

document.querySelectorAll(".megamenu-trigger").forEach(trigger => {
    trigger.addEventListener("click", function (event) {
        toggleMegaMenu(this, ".megamenu-box");
        event.stopPropagation();
    });
});

function toggleDropDownMenu(element, dropdownClass) {
    closeAllMenus();
    let dropdown = element.closest("li").querySelector(dropdownClass);
    dropdown.classList.toggle("hidden");
    element.closest("li").querySelector(".arrowkey-main-navitem").classList.toggle("rotate-180");
    element.closest("li").querySelector(".arrowkey-main-navitem path").classList.toggle("fill-secondary");
    element.closest("li").querySelector("span").classList.toggle("active-menu-item");
    darkbg.classList.toggle("hidden", !dropdown.classList.contains("hidden"));
}

document.querySelectorAll(".dropdown-trigger").forEach(trigger => {
    trigger.addEventListener("click", function (event) {
        toggleDropDownMenu(this, ".dropdown-menu");
        event.stopPropagation();
    });
});


// // MegaMenu functions

// const darkbg = document.getElementById("bg-dark-full");
// function openMegaMenu(navbarclicked , megamenuclass){
//     let megamenubox = navbarclicked.closest("li").querySelector(megamenuclass);
//     let arrowkey = navbarclicked.querySelector(".arrowkey-main-navitem");


//     megamenubox.classList.toggle("!block");
//     darkbg.classList.toggle("!block");
//     arrowkey.classList.toggle("rotate-180")
//     arrowkey.querySelector("path").classList.toggle("fill-secondary")
//     navbarclicked.classList.toggle("active-menu-item");

// }
// document.getElementById("megamenu-amitistour").addEventListener("click", function (event) {
//     if (event.target === this) {
//         this.classList.add("hidden");
//         this.classList.remove("!block");
//         this.closest("li").querySelector("span").classList.remove("active-menu-item");
//         this.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180");
//         this.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary");
//     }
// });

// function openSubMegaMenu(submenu , submegamenuclass , displaymode , siblingsclass){
//     let siblings = submenu.closest(".megamenu-box").querySelectorAll("."+siblingsclass);
//     let siblingnavbar = submenu.closest("ul").querySelectorAll("li");
//     let submegamenubox = document.querySelector("."+submegamenuclass);

//     siblingnavbar.forEach(navitem => {
//         navitem.classList.remove("active-megamenu-tab")
//     });
//     siblings.forEach(element => {
//         element.classList.remove(displaymode);
//         element.classList.add("hidden");
//     });

//     submegamenubox.classList.toggle(displaymode);
//     submegamenubox.classList.toggle('hidden');
//     darkbg.classList.toggle("!block");
//     submenu.classList.toggle("active-megamenu-tab");
// }

// // menu DropDown functions
// function openDropDownMenu(element, dropdownClass) {
//     document.querySelectorAll(dropdownClass).forEach(dropdown => {
//         dropdown.classList.remove("!block");
//         dropdown.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180")
//         dropdown.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary")
//         dropdown.closest("li").querySelector("span").classList.remove("active-menu-item");
//     });

//     const dropdown = element.closest("li").querySelector(dropdownClass);
//     dropdown.classList.toggle("!block");
//     darkbg.classList.toggle("!block");
//     element.closest("li").querySelector(".arrowkey-main-navitem").classList.add("rotate-180")
//     element.closest("li").querySelector(".arrowkey-main-navitem path").classList.add("fill-secondary")
//     element.closest("li").querySelector("span").classList.add("active-menu-item");


//     document.addEventListener("click", function closeDropdown(event) {
//         if (!element.closest("li").contains(event.target)) {
//             dropdown.classList.remove("!block");
//             dropdown.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180")
//             dropdown.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary")
//             dropdown.closest("li").querySelector("span").classList.remove("active-menu-item");
//             document.removeEventListener("click", closeDropdown);
//         }
//     });
// }



function ToggleFAQ(element) {
    document.querySelectorAll(".faq-active").forEach(activeItem => {
        if (activeItem !== element) {
            activeItem.classList.remove("faq-active");
            let questionBox = activeItem.querySelector(".question-box");
            questionBox.classList.remove("bg-primary-50");
            questionBox.classList.add("bg-white");
            
            let numberContainer = activeItem.querySelector(".number-of-faq-row");
            numberContainer.classList.remove("bg-primary");
            numberContainer.classList.add("bg-secondary");

            let numberText = numberContainer.querySelector(".number-of-faq-row div");
            numberText.classList.remove("text-secondary");
            numberText.classList.add("text-txtneutral-500");

            let answerBox = activeItem.querySelector(".answer-box");
            answerBox.classList.remove("visible", "p-5", "my-6");
            answerBox.classList.add("invisible", "h-0", "p-0", "m-0");
            answerBox.querySelector("div").classList.add("opacity-0");

            let icon = activeItem.querySelector("svg");
            icon.classList.remove("rotate-180");
            icon.querySelector("path").classList.remove("fill-primary");
        }
    });

    element.classList.toggle("faq-active");
    let questionBox = element.querySelector(".question-box");
    let numberContainer = element.querySelector(".number-of-faq-row");
    let numberText = numberContainer.querySelector(".number-of-faq-row div");
    let answerBox = element.querySelector(".answer-box");
    let icon = element.querySelector("svg");

    if (element.classList.contains("faq-active")) {
        questionBox.classList.remove("bg-white");
        questionBox.classList.add("bg-primary-50");
        numberContainer.classList.add("bg-primary");
        numberContainer.classList.remove("bg-secondary");
        numberText.classList.add("text-secondary");
        numberText.classList.remove("text-txtneutral-500");
        answerBox.classList.add("visible", "p-5", "my-6");
        answerBox.classList.remove("invisible", "h-0", "p-0", "m-0");
        answerBox.querySelector("div").classList.remove("opacity-0");
        icon.classList.add("rotate-180");
        icon.querySelector("path").classList.add("fill-primary");

    } else {
        questionBox.classList.remove("bg-primary-50");
        questionBox.classList.add("bg-white");
        numberContainer.classList.remove("bg-primary");
        numberContainer.classList.add("bg-secondary");
        numberText.classList.remove("text-secondary");
        numberText.classList.add("text-txtneutral-500");
        answerBox.classList.remove("visible", "p-5", "my-6");
        answerBox.classList.add("invisible", "h-0", "p-0", "m-0");
        answerBox.querySelector("div").classList.add("opacity-0");
        icon.classList.remove("rotate-180");
        icon.querySelector("path").classList.remove("fill-primary");
    }
}

function CloseAdv(element, className) {
    const target = document.querySelector(`.${className}`);
    if (target) {
        target.classList.add('hidden');
    }
}

function ShareSocialMedia(event, containerid) {
    event.stopPropagation(); // جلوگیری از بسته شدن هنگام کلیک داخل باکس

    const container = document.getElementById(containerid);
    const shareBox = container.querySelector('.socialmedia-box-share');
    const txtcontainer = container.querySelector(".text-share-box");
    const bgactivation = container.querySelector(".bg-activation-sharebtn");
    const onlybtncontainer = document.getElementById("sharebutton-content");
    

    if (!container || !shareBox) return;

    // بررسی باز یا بسته بودن
    const isOpen = container.classList.contains("hovered");

    if (isOpen) {
        // بستن باکس
        shareBox.classList.add("invisible", "opacity-0");
        container.classList.remove("hovered","w-[302px]");
        onlybtncontainer.classList.remove("w-[302px]");
        txtcontainer.classList.remove("text-white");
        bgactivation.classList.remove("right-0","mx-0","h-full","w-full");

    } else {
        // بستن سایر باکس‌ها (در صورتی که چندین باکس وجود داشته باشد)
        document.querySelectorAll(".share-container").forEach(el => {
            el.classList.remove("hovered","w-[302px]");
            onlybtncontainer.classList.remove("w-[302px]");
            txtcontainer.classList.remove("text-white");
            bgactivation.classList.remove("right-0","mx-0","h-full","w-full");
            el.querySelector(".socialmedia-box-share").classList.add("invisible", "opacity-0");
        });

        // باز کردن باکس
        shareBox.classList.remove("invisible", "opacity-0","w-[302px]");
        container.classList.add("hovered","w-[302px]");
        onlybtncontainer.classList.add("w-[302px]");
        txtcontainer.classList.add("text-white");
        bgactivation.classList.add("right-0","mx-0","h-full","w-full");
    }
}
document.addEventListener("click", function () {
    document.querySelectorAll(".share-container").forEach(el => {
        el.classList.remove("hovered", "w-[302px]");
        el.querySelector(".socialmedia-box-share").classList.add("invisible", "opacity-0");
        const onlybtncontainer = el.querySelector("#sharebutton-content");
        const txtcontainer = el.querySelector(".text-share-box");
        const bgactivation = el.querySelector(".bg-activation-sharebtn");
        if (onlybtncontainer) onlybtncontainer.classList.remove("w-[302px]");
        if (txtcontainer) txtcontainer.classList.remove("text-white");
        if (bgactivation) bgactivation.classList.remove("right-0", "mx-0", "h-full", "w-full");
    });
});



if(document.querySelector(".swiper-tourcard")){
    var swipertourcard = new Swiper(".swiper-tourcard", {
        slidesPerView: 3.5,
        speed: 400,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop:true,
      navigation: {
    nextEl: '.swipertourcard-button-next',
    prevEl: '.swipertourcard-button-prev',
    },
      breakpoints: {
        640: {
          slidesPerView:1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 50,
        },
      },
    });
}
if (document.querySelector(".swiper-papulartourcard")) {
  var swipertourcard = new Swiper(".swiper-papulartourcard", {
      slidesPerView: 'auto',
      speed: 700,
      centeredSlides: true,
      spaceBetween: 20,
      direction: 'vertical',
      effect: 'slide',
      grabCursor: true,
      autoplay: {
          delay: 1400,
          disableOnInteraction: false,
      },
      scrollbar: {
          el: '.papulartourcard-scrollbar',
          draggable: true,
      },
      loop: true,
      navigation: {
          nextEl: '.papulartourcard-button-next',
          prevEl: '.papulartourcard-button-prev',
      },
      on: {
          slideChange: function () {
              updateImage(swipertourcard);
          }
      }
  });

  function updateImage(swiper) {
      var activeSlide = swiper.slides[swiper.activeIndex]; // گرفتن اسلاید فعال
      var newImage = activeSlide.getAttribute("data-image"); // مقدار data-image را دریافت کن

      var imageHolder = document.getElementById("papular-image-holder");
      if (newImage && imageHolder) {
          imageHolder.src = newImage; // تغییر تصویر
      }
  }
}

