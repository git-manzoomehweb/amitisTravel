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
        bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");

    } else {
        // بستن سایر باکس‌ها (در صورتی که چندین باکس وجود داشته باشد)
        document.querySelectorAll(".share-container").forEach(el => {
            el.classList.remove("hovered","w-[302px]");
            onlybtncontainer.classList.remove("w-[302px]");
            txtcontainer.classList.remove("text-white");
            bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");
            el.querySelector(".socialmedia-box-share").classList.add("invisible", "opacity-0");
        });

        // باز کردن باکس
        shareBox.classList.remove("invisible", "opacity-0","w-[302px]");
        container.classList.add("hovered","w-[302px]");
        onlybtncontainer.classList.add("w-[302px]");
        txtcontainer.classList.add("text-white");
        bgactivation.classList.add("right-0","!mx-0","h-full","w-full","p-0");
    }
}


function ShareSocialMediaPrimary(event, containerid) {
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
        // bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");

    } else {
        // بستن سایر باکس‌ها (در صورتی که چندین باکس وجود داشته باشد)
        document.querySelectorAll(".share-container").forEach(el => {
            el.classList.remove("hovered","w-[302px]");
            onlybtncontainer.classList.remove("w-[302px]");
            txtcontainer.classList.remove("text-white");
            // bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");
            el.querySelector(".socialmedia-box-share").classList.add("invisible", "opacity-0");
        });

        // باز کردن باکس
        shareBox.classList.remove("invisible", "opacity-0","w-[302px]");
        container.classList.add("hovered","w-[302px]");
        onlybtncontainer.classList.add("w-[302px]");
        txtcontainer.classList.add("text-white");
        // bgactivation.classList.add("right-0","!mx-0","h-full","w-full","p-0");
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
        if (bgactivation) bgactivation.classList.remove("right-0", "!mx-0", "h-full", "w-full","p-0");
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

document.addEventListener("DOMContentLoaded", function () {
    if(document.querySelector(".scrollToTop")){
        const scrollToTopBtn = document.getElementById("scrollToTop");
    
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove("opacity-0");
                scrollToTopBtn.classList.add("opacity-100");
            } else {
                scrollToTopBtn.classList.remove("opacity-100");
                scrollToTopBtn.classList.add("opacity-0");
            }
        });
    
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// podcast box
document.addEventListener("DOMContentLoaded", function () {
    if(document.getElementById("playPauseBtn")){
        const playPauseBtn = document.getElementById("playPauseBtn");
        const waveContainer = document.getElementById("waveform");
        const audioElement = document.getElementById("audioSource"); 
        let isManuallyPlaying = false;
    
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#fff',
            progressColor: '#005FF0',
            cursorColor: 'transparent',
            barWidth: 1,
            height: 40,
            responsive: true
        });
    
        if (audioElement && audioElement.src) {
            wavesurfer.load(audioElement.src); 
        }
    
        function togglePlayPause() {
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                isManuallyPlaying = false;
                waveContainer.classList.remove("playing");
            } else {
                wavesurfer.play();
                isManuallyPlaying = true;
                waveContainer.classList.add("playing");
            }
        }
    
        playPauseBtn.addEventListener('click', function () {
            togglePlayPause();
        });
    }
});

//video player
// document.addEventListener("DOMContentLoaded", function () {
//     const videoModal = document.getElementById("videoModal");
//     const closeModal = document.getElementById("closeModal");
//     const videoPlayer = document.getElementById("videoPlayer");
//     const videoSource = document.getElementById("videoSource");
    
//     document.querySelectorAll(".openModal").forEach(button => {
//         button.addEventListener("click", function () {
//             const videoUrl = this.getAttribute("data-video");
//             if (videoUrl) {
//                 videoSource.src = videoUrl;
//                 videoPlayer.load();
//                 videoModal.classList.remove("hidden");
//                 videoPlayer.play();
//             }
//         });
//     });
    
//     function closeVideoModal() {
//         videoModal.classList.add("hidden");
//         videoPlayer.pause();
//         videoPlayer.currentTime = 0;
//     }
    
//     closeModal.addEventListener("click", closeVideoModal);
//     videoModal.addEventListener("click", function (event) {
//         if (event.target === videoModal) {
//             closeVideoModal();
//         }
//     });
// });

if(document.querySelector(".passengers-video") || document.getElementById("podcastandvideo")){
    document.addEventListener("DOMContentLoaded", function () {
        const videoModal = document.getElementById("videoModal");
        const closeModal = document.getElementById("closeModal");
        const videoPlayer = document.getElementById("videoPlayer");
        const videoSource = document.getElementById("videoSource");
    
        // اسلایدر Swiper
        new Swiper(".passengers-video", {
            slidesPerView: 'auto' ,
            speed: 1500,
            centeredSlides: true,
            spaceBetween: 20,
            effect: 'slide',
            grabCursor: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            loop: true,
    
        });
    
        // رویداد کلیک برای باز کردن مودال
        document.querySelectorAll(".openModal").forEach(item => {
            item.addEventListener("click", function () {
                const videoUrl = this.getAttribute("data-video");
                if (videoUrl) {
                    videoSource.src = videoUrl;
                    videoPlayer.load();
                    videoModal.classList.remove("hidden");
                    videoPlayer.play();
                }
            });
        });
    
        // تابع بستن مودال
        function closeVideoModal() {
            videoModal.classList.add("hidden");
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    
        closeModal.addEventListener("click", closeVideoModal);
        videoModal.addEventListener("click", function (event) {
            if (event.target === videoModal) {
                closeVideoModal();
            }
        });
    });
}

// document.addEventListener("DOMContentLoaded", function () {
//     const sidebar = document.querySelector("aside");
//     const sidebarControl = document.getElementById("sidebar-controll");
//     const menuItems = document.querySelectorAll("aside ul li");
//     const links = document.querySelectorAll("aside ul li a");

//     // تابع اسکرول نرم
//     links.forEach(link => {
//         link.addEventListener("click", function (event) {
//             const targetId = this.getAttribute("href").substring(1);
//             const targetElement = document.getElementById(targetId);

//             if (targetElement) {
//                 event.preventDefault();
//                 window.scrollTo({
//                     top: targetElement.offsetTop - 20,
//                     behavior: "smooth"
//                 });
//             }
//         });
//     });

//     // بررسی وجود سکشن‌ها در صفحه و تغییر استایل
//     function updateMenuItems() {
//         menuItems.forEach(item => {
//             const link = item.querySelector("a");
//             const targetId = link.getAttribute("href").substring(1);
//             const targetElement = document.getElementById(targetId);

//             if (targetElement) {
//                 item.classList.remove("grayscale"); // فعال‌سازی آیتم
//                 item.classList.add("hover:bg-secondary-200"); // استایل هاور اضافه شود
//             } else {
//                 item.classList.add("grayscale"); // غیرفعال کردن آیتم
//                 item.classList.remove("hover:bg-secondary-200");
//             }
//         });
//     }

//     updateMenuItems(); // بررسی اولیه
//     window.addEventListener("resize", updateMenuItems);
//     window.addEventListener("scroll", updateMenuItems);

//     // تابع جمع کردن سایدبار
//     sidebarControl.addEventListener("click", function () {
//         sidebar.classList.toggle("collapsed");

//         if (sidebar.classList.contains("collapsed")) {
//             sidebar.classList.add("w-[80px]");
//             sidebar.classList.remove("w-80");
//             links.forEach(link => link.querySelector("span").classList.add("hidden"));
//         } else {
//             sidebar.classList.remove("w-[80px]");
//             sidebar.classList.add("w-80");
//             links.forEach(link => link.querySelector("span").classList.remove("hidden"));
//         }
//     });
// });

if(document.getElementById("handle-resize")){
    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.querySelector("aside");
        const handleResize = document.getElementById("handle-resize");
        const sidebarControl = document.getElementById("sidebar-controll");
        const menuItems = document.querySelectorAll("aside ul li");
        const links = document.querySelectorAll("aside ul li a");
    
        // تابع اسکرول نرم
        links.forEach(link => {
            link.addEventListener("click", function (event) {
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    event.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: "smooth"
                    });
                }
            });
        });
    
        // بررسی وجود سکشن‌ها در صفحه و تغییر استایل
        function updateMenuItems() {
            menuItems.forEach(item => {
                const link = item.querySelector("a");
                const targetId = link.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    item.classList.remove("grayscale"); // فعال‌سازی آیتم
                    item.classList.add("hover:bg-secondary-200"); // استایل هاور اضافه شود
                } else {
                    item.classList.add("grayscale"); // غیرفعال کردن آیتم
                    item.classList.remove("hover:bg-secondary-200");
                }
            });
        }
    
        updateMenuItems(); // بررسی اولیه
        window.addEventListener("resize", updateMenuItems);
        window.addEventListener("scroll", updateMenuItems);
    
        // تابع جمع کردن سایدبار
        handleResize.addEventListener("click", function () {
            sidebar.classList.toggle("collapsed");
            sidebarControl.classList.toggle("rotate-180"); // اضافه کردن چرخش 180 درجه
    
            if (sidebar.classList.contains("collapsed")) {
                sidebar.classList.add("w-[100px]");
                sidebar.classList.remove("w-80");
                links.forEach(link => link.querySelector("span").classList.add("hidden"));
            } else {
                sidebar.classList.remove("w-[100px]");
                sidebar.classList.add("w-80");
                links.forEach(link => link.querySelector("span").classList.remove("hidden"));
            }
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll("ul.docs > li");

    items.forEach((item) => {
        const header = item.querySelector(".flex");
        const content = item.querySelector("div.border");
        const arrow = item.querySelector(".arrow-visa-documents");
        const title = item.querySelector("h2 span");
        const svgPath = item.querySelector(".arrow-visa-documents path");
        const h2Element = item.querySelector("h2");

        header.addEventListener("click", function () {
            const isActive = item.classList.contains("active-question");
            
            // بستن همه موارد
            items.forEach((el) => {
                el.classList.remove("active-question");
                el.querySelector("div.border").classList.add("invisible",  "h-0", "p-0", "opacity-0");
                el.querySelector("div.border").classList.remove("visible",  "h-fit", "py-4", "px-8", "opacity-100");
                el.querySelector(".arrow-visa-documents").classList.remove("rotate-180");
                el.querySelector("h2 span").classList.remove("text-primary");
                el.querySelector(".flex").classList.remove("bg-primary-50");
                el.querySelector(".arrow-visa-documents path").classList.remove("fill-primary");
                el.querySelector("h2").classList.add("before:bg-primary-900");
                el.querySelector("h2").classList.remove("before:!bg-primary");
            });
            
            if (!isActive) {
                item.classList.add("active-question");
                content.classList.remove("invisible",  "h-0", "p-0", "opacity-0");
                content.classList.add("visible", "h-fit", "py-4", "px-8", "opacity-100");
                arrow.classList.add("rotate-180");
                title.classList.add("text-primary");
                header.classList.add("bg-primary-50");
                svgPath.classList.add("fill-primary");
                h2Element.classList.add("before:!bg-primary");
            }
        });
    });
});


if(document.getElementById("banner-blog")){

    var swiperbanner = new Swiper("#banner-blog", {
        slidesPerView: 1,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-next-banner',
            prevEl: '.swiper-prev-banner',
          },
        
      });
}



if (document.querySelector(".swiper-most-visited")) {
    const mostvisited = new Swiper('.swiper-most-visited', {
    effect: "cards",
    loop: true,
    // grabCursor: true,
    // cssMode: true,
    perSlideOffset: 20,
      navigation: {
        nextEl: '.swiper-most-visited-next',
        prevEl: '.swiper-most-visited-prev',
      },
    });

    function updateSlideContent() {
      const activeSlide = mostvisited.slides[mostvisited.activeIndex];
      
      if (activeSlide) {
        const title = activeSlide.getAttribute('data-title') || '';
        const text = activeSlide.getAttribute('data-text') || '';
        const link = activeSlide.getAttribute('data-link') || '#';
  
        document.getElementById('title').innerText = title;
        document.getElementById('text').innerHTML = text;
        document.getElementById('bookinglink').setAttribute("href", link);
      }
    }
  
    mostvisited.on('slideChangeTransitionEnd', updateSlideContent);
    updateSlideContent();
  }

  document.querySelectorAll('.dropdowntitr').forEach(item => {
    item.addEventListener('click', function () {
        let parent = this.closest('.dropdownBox');
        let content = parent.querySelector('.dropdownCotent');
        let icon = this.querySelector('.opendropdow');
        
        item.classList.toggle('border-b');
        
        if (content) {
            content.classList.toggle('hidden');
        }
        
        if (icon) {
            icon.classList.toggle('rotate-180');
        }
    });
});


const fabButton = document.getElementById("fabButton");
const fabMenu = document.getElementById("fabMenu");

if(fabButton && fabMenu){
    // باز و بسته کردن منو با کلیک روی دکمه
    fabButton.addEventListener("click", (event) => {
        event.stopPropagation(); // جلوگیری از بسته شدن هنگام کلیک روی دکمه
        fabMenu.classList.toggle("scale-0");
        fabMenu.classList.toggle("opacity-0");
    });
    
    // بستن منو با کلیک خارج از آن
    document.addEventListener("click", (event) => {
        if (!fabMenu.contains(event.target) && !fabButton.contains(event.target)) {
            fabMenu.classList.add("scale-0");
            fabMenu.classList.add("opacity-0");
        }
    });
}
  

if(document.querySelector(".partners-company-slider")){
    var swiperpartners = new Swiper(".partners-company-slider", {
        slidesPerView: "auto",
        speed: 400,
      centeredSlides: true,
    //   spaceBetween: 20,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop:true,
      navigation: {
    nextEl: '.partners-company-button-next',
    prevEl: '.partners-company-button-prev',
    }
    });
}
