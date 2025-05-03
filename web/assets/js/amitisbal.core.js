
// start searchbox functions
function moveFlightClassIntoPassengerBox() {
  document.querySelectorAll(".Flightclass-Passenger").forEach((container) => {
    const flightClassField = container.querySelector(".flightclass-field");
    const passengerBox = container.querySelector(".passengerbox");
    if (flightClassField && passengerBox) {
      passengerBox.insertBefore(flightClassField, passengerBox.firstChild);
    }
  });
}
if(document.getElementById("search-box")){
  document.addEventListener("DOMContentLoaded", function () {
    const isDesktop = window.innerWidth > 1024;
    const requiredFiles = isDesktop
      ? ["amitisbapars.ui.min.css", "swiper-bundle.min.css"]
      : ["amitisbapars-mob.ui.css", "swiper-bundle.min.css"];
    function checkAllResourcesLoaded() {
      const resources = performance.getEntriesByType("resource");
      const loadedFiles = resources
        .map((res) => res.name.split("/").pop()) 
        .filter((name) => requiredFiles.includes(name));
      return requiredFiles.every((file) => loadedFiles.includes(file));
    }
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "search-engine.bc");
        xhrobj.send();
        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;
            moveFlightClassIntoPassengerBox();
            const pass = document.querySelectorAll(".passenger-counts.adult-count");
            pass.forEach((p) => {
              p.parentElement.classList.add("passenger-counts_container");
            });
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی رخ داده است لطفا صبور باشید.", error);
      }
    }
    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }
    waitForFiles();
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".reserve-field.flightclass-field").forEach((t) => {
      let r = t.querySelector("ul.FlightClass");
      t.contains(e.target) || r.classList.add("hidden");
    });
  }),
    document.addEventListener("click", function (e) {
      document.querySelectorAll(".passengers-field").forEach((t) => {
        let r = t.querySelector(".passengerbox");
        t.contains(e.target) || r.classList.add("hidden");
      });
    });
  
    if (window.innerWidth > 1024) {
      document.addEventListener("click", function (event) {
          if (event.target.closest("#multi")) {
                    const container = document.querySelector(".multiroute-fields");
                    const addDestinationBtn = document.querySelector(".multiroute-fields > .Flightclass-Passenger");
                    const removeBtn = document.querySelector(".multiroute-fields > .reserve-field");
                    const searchBtn = document.querySelector(".multiroute-fields > .reserve-search");
                    if (container && addDestinationBtn && removeBtn && searchBtn) {                    
                        container.prepend(addDestinationBtn);
                        container.appendChild(searchBtn);
                        container.appendChild(removeBtn);
                    }
            }
      });
    }
}
// end searchbox functions

// lazyloading images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              const originalSrc = img.src; 
              const newSrc = img.getAttribute("data-src");
              img.src = newSrc;
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
// lazyloading images



// default - mobile - sliders
  if (window.innerWidth < 1024) {
    if(document.querySelector(".advertise-slider")){
      var adsSwiper = new Swiper(".advertise-slider", {
        slidesPerView: 1,
        speed: 400,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination-ads",
            clickable: true,
        }
    });
    }
    if(document.querySelector(".specialtours-mob-slider")){
      var specialSwiper = new Swiper(".specialtours-mob-slider", {
          slidesPerView: 'auto',
          speed: 1000,
          spaceBetween: 40,
          centeredSlides: true,
          grabCursor: true,
          autoplay: {
              delay: 5000,
              disableOnInteraction: false,
          },
          loop: true
      });
    }
    if(document.getElementById("suggestiontour-mob")){
      var specialSwiper = new Swiper("#suggestiontour-mob", {
          slidesPerView: 'auto',
          speed: 1000,
          spaceBetween: 20,
          centeredSlides: true,
          grabCursor: true,
          autoplay: {
              delay: 5000,
              disableOnInteraction: false,
          },
          loop: true
      });
    }
    document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll('.bmi-tab');
          const activeMap = {
            "page-hotels": "hotel",
            "page-tours": "tour",
            "page-home": "home",
            "page-magazine": "magazine",
        };
    
        const bodyClass = document.body.className;
        let activeTab = null;
    
        console.log(bodyClass)
        for (const cls in activeMap) {
            if (bodyClass.includes(cls)) {
                activeTab = activeMap[cls];
                break;
            }
        }
        console.log(activeTab)
    
          tabs.forEach(t => {
            t.querySelector('.bmi-active-btn').classList.add('hidden');
            t.querySelector('.bmi-simple-btn').classList.remove('hidden');
            t.querySelector('.tab-text').classList.remove('text-primary');
        });
          if (activeTab) {
            const currentTab = document.querySelector(`.bmi-tab[data-page="${activeTab}"]`);
            if (currentTab) {
                currentTab.querySelector('.bmi-active-btn').classList.remove('hidden');
                currentTab.querySelector('.bmi-simple-btn').classList.add('hidden');
                currentTab.querySelector('.tab-text').classList.add('text-primary');
    
            }
        }
    });
  }
// default - mobile - sliders





if (window.innerWidth > 1024) {

  function closeAllMenus() {
      document.querySelectorAll(".megamenu-box, .dropdown-menu").forEach(menu => {
          menu.classList.remove("!block");
      });
      document.querySelectorAll(".arrowkey-main-navitem").forEach(arrow => {
          arrow.classList.remove("rotate-180");
          arrow.querySelector("path").classList.remove("fill-secondary");
      });
      document.querySelectorAll(".active-menu-item").forEach(item => {
          item.classList.remove("active-menu-item");
      });
  }
  
  function openMegaMenu(navbarclicked , megamenuclass){
      closeAllMenus();
      let megamenubox = navbarclicked.closest("li").querySelector(megamenuclass);
      let arrowkey = navbarclicked.querySelector(".arrowkey-main-navitem");
  
      megamenubox.classList.toggle("!block");
      arrowkey.classList.toggle("rotate-180")
      arrowkey.querySelector("path").classList.toggle("fill-secondary")
      navbarclicked.classList.toggle("active-menu-item");
  
  }
  
  document.getElementById("megamenu-amitistour").addEventListener("click", function (event) {
      if (event.target === this) {
          this.classList.add("hidden");
          this.classList.remove("!block");
          this.closest("li").querySelector("span").classList.remove("active-menu-item");
          this.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180");
          this.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary");
      }
  });
  
  
  function openSubMegaMenu(submenu , submegamenuclass , displaymode , siblingsclass){
      let siblings = submenu.closest(".megamenu-box").querySelectorAll("."+siblingsclass);
      let siblingnavbar = submenu.closest("ul").querySelectorAll("li");
      let submegamenubox = document.querySelector("."+submegamenuclass);
  
      siblingnavbar.forEach(navitem => {
          navitem.classList.remove("active-megamenu-tab")
      });

      siblings.forEach(element => {
          element.classList.remove(displaymode);
          element.classList.add("hidden");
      });
  
      submegamenubox.classList.add(displaymode);
      submegamenubox.classList.remove('hidden');
      submenu.classList.add("active-megamenu-tab");
  }


  
  // menu DropDown functions
  function toggleDropDownMenu(element, dropdownClass) {
      closeAllMenus();
      document.querySelectorAll(dropdownClass).forEach(dropdown => {
          dropdown.classList.remove("!block");
          dropdown.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180")
          dropdown.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary")
          dropdown.closest("li").querySelector("span").classList.remove("active-menu-item");
      });
  
      const dropdown = element.closest("li").querySelector(dropdownClass);
      dropdown.classList.toggle("!block");
      element.closest("li").querySelector(".arrowkey-main-navitem").classList.add("rotate-180")
      element.closest("li").querySelector(".arrowkey-main-navitem path").classList.add("fill-secondary")
      element.closest("li").querySelector("span").classList.add("active-menu-item");
  
  
      document.addEventListener("click", function closeDropdown(event) {
          if (!element.closest("li").contains(event.target)) {
              dropdown.classList.remove("!block");
              dropdown.closest("li").querySelector(".arrowkey-main-navitem").classList.remove("rotate-180")
              dropdown.closest("li").querySelector(".arrowkey-main-navitem path").classList.remove("fill-secondary")
              dropdown.closest("li").querySelector("span").classList.remove("active-menu-item");
              document.removeEventListener("click", closeDropdown);
          }
      });
  }
  
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
        centeredSlides: true,
        spaceBetween: 20,
        grabCursor: true,
        loop:true,
        navigation: {
      nextEl: '.swipertourcard-button-next',
      prevEl: '.swipertourcard-button-prev',
      },
        breakpoints: {
          640: {
            slidesPerView:1.5,
            spaceBetween: 20,
          },
          1020: {
            slidesPerView: 2.9,
            spaceBetween: 40,
          },
          1200: {
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
        // centeredSlides: true,
        spaceBetween: 12,
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
    const btn = document.getElementById("scrollToTop");
    const footer = document.getElementById("footer");
  
    if (!btn || !footer) return;
  
    const defaultBottom = 16; // px
  
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
  
      const footerTop = footer.offsetTop; // فاصله فوتر از بالای کل سند
      const scrollBottom = scrollY + windowHeight; // پایین صفحه کاربر
  
      // نمایش یا مخفی کردن دکمه
      if (scrollY > 300) {
        btn.classList.remove("opacity-0");
        btn.classList.add("opacity-100");
      } else {
        btn.classList.remove("opacity-100");
        btn.classList.add("opacity-0");
      }
  
      // اگر پایین صفحه به فوتر نزدیک بود، دکمه رو بالا نگه‌دار
      if (scrollBottom > footerTop) {
        const overlap = scrollBottom - footerTop + defaultBottom;
        btn.style.bottom = `${overlap}px`;
      } else {
        btn.style.bottom = `${defaultBottom}px`;
      }
    });
  
    // کلیک روی دکمه
    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  


    
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scrollToTop");
  const footer = document.getElementById("footer");

  if (!btn || !footer) return;

  const defaultBottom = 16; // فاصله‌ی استاندارد از پایین صفحه
  const btnHeight = btn.offsetHeight;

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const footerTop = footer.getBoundingClientRect().top + window.scrollY;

    const btnBottomPosition = scrollY + windowHeight - defaultBottom;

    // نمایش یا پنهان کردن دکمه
    if (scrollY > 300) {
      btn.classList.remove("opacity-0");
      btn.classList.add("opacity-100");
    } else {
      btn.classList.remove("opacity-100");
      btn.classList.add("opacity-0");
    }

    // اگر دکمه در حال ورود به فوتر باشه
    if (btnBottomPosition > footerTop) {
      const newBottom = btnBottomPosition - footerTop + defaultBottom;
      btn.style.bottom = `${newBottom}px`;
    } else {
      btn.style.bottom = `${defaultBottom}px`;
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

  
  

  
  

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
  
  function showMoreDates(element , dropdownid){
      var btnText = element.innerText;
      var dropDown = document.getElementById(dropdownid);
      dropDown.classList.toggle("h-24");
  
      console.log(btnText);
      if(btnText == 'مشاهده بیشتر'){
          console.log("کمتر")
          element.innerText = 'مشاهده کمتر';
      }else{
          console.log("بیشتر")
          element.innerText = 'مشاهده بیشتر';
      }
  }
  
  // hotel-view
  if(document.querySelector("#comments-slider")){
    var swipercomments = new Swiper("#comments-slider", {
        slidesPerView: 1.5 ,
        speed: 1500,
        centeredSlides: true,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        loop: true,
    });
  }
  // hotel-view
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


function ShareSocialMediaMob(event, containerid) {
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
      txtcontainer.classList.remove("text-white");
      bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");

  } else {
      // بستن سایر باکس‌ها (در صورتی که چندین باکس وجود داشته باشد)
      document.querySelectorAll(".share-container").forEach(el => {
          txtcontainer.classList.remove("text-white");
          bgactivation.classList.remove("right-0","!mx-0","h-full","w-full","p-0");
          el.querySelector(".socialmedia-box-share").classList.add("invisible", "opacity-0");
      });

      // باز کردن باکس
      shareBox.classList.remove("invisible", "opacity-0");
      txtcontainer.classList.add("text-white");
      bgactivation.classList.add("right-0","!mx-0","h-full","w-full","p-0");
  }
}

function ShareSocialMediaMob(event, containerid) {
  event.stopPropagation(); // جلوگیری از بسته شدن هنگام کلیک داخل باکس

  const container = document.getElementById(containerid);
  if (!container) return;

  const shareBox = container.querySelector('.socialmedia-box-share');
  const txtcontainer = container.querySelector(".text-share-box");
  const bgactivation = container.querySelector(".bg-activation-sharebtn");

  // بررسی باز یا بسته بودن
  const isOpen = container.classList.contains("hovered");

  if (isOpen) {
      // بستن باکس جاری
      shareBox.classList.add("invisible", "opacity-0");
      txtcontainer.classList.remove("text-white");
      bgactivation.classList.remove("right-0", "!mx-0", "h-full", "w-full", "p-0");
      container.classList.remove("hovered");

  } else {
      // بستن همه‌ی باکس‌ها
      document.querySelectorAll(".share-container").forEach(el => {
          el.classList.remove("hovered");

          const box = el.querySelector(".socialmedia-box-share");
          const txt = el.querySelector(".text-share-box");
          const bg = el.querySelector(".bg-activation-sharebtn");

          if (box) box.classList.add("invisible", "opacity-0");
          if (txt) txt.classList.remove("text-white");
          if (bg) bg.classList.remove("right-0", "!mx-0", "h-full", "w-full", "p-0");
      });

      // باز کردن باکس جاری
      shareBox.classList.remove("invisible", "opacity-0");
      txtcontainer.classList.add("text-white");
      bgactivation.classList.add("right-0", "!mx-0", "h-full", "w-full", "p-0");
      container.classList.add("hovered");
  }
}


function ToggleFAQMob(element) {
  document.querySelectorAll(".faq-active").forEach(activeItem => {
      if (activeItem !== element) {
        activeItem.classList.remove("faq-active");


        let questiontitle = activeItem.querySelector(".question-title");
        questiontitle.classList.add("text-txtneutral-900");
        questiontitle.classList.remove("text-primary");

        let questionRow = document.querySelector(".row-question-answer");
        questionRow.classList.remove("py-1");

          let questionBox = activeItem.querySelector(".question-box");
          questionBox.classList.remove("bg-primary-50");
          questionBox.classList.add("bg-white");
          let answerBox = activeItem.querySelector(".answer-box");
          answerBox.classList.remove("visible", "p-2");
          answerBox.classList.add("invisible", "h-0", "p-0", "m-0");
          answerBox.querySelector("div").classList.add("opacity-0");

      }
  });

  element.classList.toggle("faq-active");
  let questionBox = element.querySelector(".question-box");
  let answerBox = element.querySelector(".answer-box");

  let questiontitle = element.querySelector(".question-title");
  let questionRow = document.querySelector(".row-question-answer");


  if (element.classList.contains("faq-active")) {
    questiontitle.classList.remove("text-txtneutral-900");
    questiontitle.classList.add("text-primary");
    questionRow.classList.remove("py-1");

      questionBox.classList.remove("bg-white");
      questionBox.classList.add("bg-primary-50");
      answerBox.classList.add("visible", "p-2");
      answerBox.classList.remove("invisible", "h-0", "p-0", "m-0");
      answerBox.querySelector("div").classList.remove("opacity-0");


  } else {
    questiontitle.classList.add("text-txtneutral-900");
    questiontitle.classList.remove("text-primary");
    questionRow.classList.add("py-1");

      questionBox.classList.remove("bg-primary-50");
      questionBox.classList.add("bg-white");
      answerBox.classList.remove("visible", "p-2");
      answerBox.classList.add("invisible", "h-0", "p-0", "m-0");
      answerBox.querySelector("div").classList.add("opacity-0");

  }
}


  // podcast box
  document.addEventListener("DOMContentLoaded", function () {
    if(document.getElementById("playPauseBtn")){
        const playPauseBtn = document.getElementById("playPauseBtn");
        const waveContainer = document.getElementById("waveform");
        const audioElement = document.getElementById("audioSource"); 
        let isManuallyPlaying = false;
        let wavesurfer;

        if (window.innerWidth > 1024) {
           wavesurfer = WaveSurfer.create({
              container: '#waveform',
              waveColor: '#fff',
              progressColor: '#005FF0',
              cursorColor: 'transparent',
              barWidth: 1,
              height: 40,
              responsive: true
          });
          
        }else{
           wavesurfer = WaveSurfer.create({
              container: '#waveform',
              waveColor: '#fff',
              progressColor: '#005FF0',
              cursorColor: 'transparent',
              barWidth: 1,
              height: 10,
              responsive: true
          });

        }
    
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




  // comment section
  
  function activeTebComment(element, container) {
    document.querySelectorAll(".comment-tab-title").forEach(el => {
      el.classList.remove("border-primary-400");
      el.classList.remove("bg-primary-100");
      el.classList.remove("text-neutralcolor-700");
    });
    document.querySelectorAll(".comment-boxes").forEach(el => {
      el.classList.add("hidden");
    });
    element.classList.add("border-primary-400");
    element.classList.add("bg-primary-100");
    element.classList.add("text-neutralcolor-700");
    document.getElementById(container).classList.remove("hidden");
  }
  /*------------------REFRESH CAPTCHA-----------------------*/
  async function reactionSubmit(id, type) {
  
    const response = await fetch("Client_CheckAuthentication.inc");
    if (!response.ok) {
      throw new Error('متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید.');
    } else {
      let CheckAuthentication = await response.text();
      if (CheckAuthentication === 'true') {
        var xhr = new XMLHttpRequest();
        var url = "/Like-Dislike.bc?id=" + encodeURIComponent(id) +
          "&type=" + encodeURIComponent(type);
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            } else {
            }
          }
        };
        xhr.send();
      } else {
        showLoginContainer(this);
      }
    }
  
  
  }
  
  function refresh_captcha(element, event) {
    var form = element.closest('form');
    var captchaElement = form.querySelector('.load-captcha');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Client_Captcha.bc', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        captchaElement.innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }
  
  async function Reply_Comment(element) {
    const responsereply = await fetch("Client_CheckAuthentication.inc");
    if (!responsereply.ok) {
      throw new Error('متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید.');
    } else {
      let CheckAuthentication = await responsereply.text();
      if (CheckAuthentication === 'true') {
        var firstname = document.querySelector('.user-profile-content .default-name').innerText;
        var lastname = document.querySelector('.user-profile-content .default-family').innerText;
        element.closest('.opinionRow').querySelector('.reply-title').value = firstname + " " + lastname;
        element.closest('.opinionRow').querySelector('.replyCommentForm').classList.toggle("hidden");
      } else {
        showLoginContainer(this);
      }
    }
  }
  
  async function SubmitOpinionForm(element, event) {
    event.preventDefault();
    const response = await fetch("Client_CheckAuthentication.inc");
    if (!response.ok) {
      throw new Error('متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید.');
    } else {
      let CheckAuthentication = await response.text();
      if (CheckAuthentication === 'true') {
        var form = new FormData(element.closest('form'));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', element.closest('form').action, true);
        xhr.onload = function () {
          if (xhr.status === 200) {
            document.getElementById('popupMessage').innerHTML = xhr.responseText;
            document.getElementById('popuparticle').classList.remove("hidden");
          } else {
            document.getElementById('popupMessage').innerHTML = xhr.responseText;
            document.getElementById('popuparticle').classList.remove("hidden");
          }
        };
        xhr.send(form);
        // window.location.reload();
      } else {
        showLoginContainer(this);
      }
    }
   
  }
  
  async function send_Reply(element, event) {
    event.preventDefault();
    var form = new FormData(element.closest('form'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', element.closest('form').action, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById('popupMessage').innerHTML = xhr.responseText;
        document.getElementById('popuparticle').classList.remove("hidden");
      } else {
        document.getElementById('popupMessage').innerHTML = xhr.responseText;
        document.getElementById('popuparticle').classList.remove("hidden");
      }
    };
    xhr.send(form);
  }

// comment section



// visa-list _ visa

function openVisaForm(el, modalId) {
  const modal = document.getElementById(modalId);
  let modalvisaclose ;
  if (window.innerWidth < 1024) {
    modalvisaclose = document.getElementById("closeModalVisa");
    modalvisaclose.addEventListener('click', function (e) {
      if (e.target === modalvisaclose) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
      }
  });
  }

  if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
  }

  modal.addEventListener('click', function (e) {
      if (e.target === modal && e.target !== modalvisaclose) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
      }
  });

  const modalContent = modal.querySelector('#visa-form-box');
  modalContent.addEventListener('click', function (e) {
      e.stopPropagation();
  });
}

function uploadDocumentvisaForm(e) {
  document.querySelector("#visa-request-form .Loading_Form").style.display =
    "block";
  let t = document
    .querySelector("#visa-request-form")
    .querySelector("#captchaContainer input[name='captcha']").value,
    r = document
      .querySelector("#visa-request-form")
      .querySelector("#captchaContainer input[name='captchaid']").value,
    i = JSON.stringify(e.source?.rows[0]);
  $bc.setSource("cms.uploadvisaForm", {
    value: i,
    captcha: t,
    captchaid: r,
    run: !0,
  });
}
function refreshCaptchavisaForm(e) {
  $bc.setSource("captcha.refreshyq", !0);
}
function captchaRenderedvisaForm() {
  document.querySelector("#visa-request-form .visaFormInput").placeholder =
    "کد امنیتی";
}
async function OnProcessedEditObjecvisaForm(e) {
  "6" == (await e.response.json()).errorid
    ? ((document.querySelector(
      "#visa-request-form .Loading_Form"
    ).style.display = "none"),
      (document.querySelector("#visa-request-form .message-api").innerHTML =
        "درخواست شما با موفقیت ثبت شد."))
    : (refreshCaptchavisaForm(),
      setTimeout(() => {
        (document.querySelector(
          "#visa-request-form .Loading_Form"
        ).style.display = "none"),
          (document.querySelector(
            "#visa-request-form .message-api"
          ).innerHTML = "خطایی رخ داده, لطفا مجدد اقدام کنید.");
      }, 2e3));
}
async function RenderFormvisaForm() {

  var e1=document.querySelector( "#visa-request-form .name-visa input" );
  e1.setAttribute("placeholder", "نام و نام خانوادگی"); 
  var e2=document.querySelector( "#visa-request-form .phone-visa input" );
  e2.setAttribute("placeholder", "شماره تماس"); 
  var e3=document.querySelector( "#visa-request-form .email-visa input" );
  e3.setAttribute("placeholder", "ایمیل"); 
  var e4=document.querySelector( "#visa-request-form .subject-visa input" );
  e4.setAttribute("placeholder", "موضوع مشاوره"); 
  var e5=document.querySelector( "#visa-request-form .age-visa input" );
  e5.setAttribute("placeholder", "سن");
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

              if(window.innerWidth < 1024){
                el.querySelector("div.border").classList.add("invisible",  "h-0", "p-0", "opacity-0");
                el.querySelector("div.border").classList.remove("visible",  "h-fit", "py-3", "px-3", "opacity-100");

              }else{

                el.querySelector("div.border").classList.add("invisible",  "h-0", "p-0", "opacity-0");
                el.querySelector("div.border").classList.remove("visible",  "h-fit", "py-4", "px-8", "opacity-100");

              }
              el.querySelector(".arrow-visa-documents").classList.remove("rotate-180");
              el.querySelector("h2 span").classList.remove("text-primary");
              el.querySelector(".flex").classList.remove("bg-primary-50");
              el.querySelector(".arrow-visa-documents path").classList.remove("fill-primary");
              el.querySelector("h2").classList.add("before:bg-primary-900");
              el.querySelector("h2").classList.remove("before:!bg-primary");
          });
          
          if (!isActive) {
              item.classList.add("active-question");

              if(window.innerWidth < 1024){
                content.classList.remove("invisible",  "h-0", "p-0", "opacity-0");
                content.classList.add("visible", "h-fit", "py-3", "px-3", "opacity-100");
              }else{
                content.classList.remove("invisible",  "h-0", "p-0", "opacity-0");
                content.classList.add("visible", "h-fit", "py-4", "px-8", "opacity-100");
              }
              
              arrow.classList.add("rotate-180");
              title.classList.add("text-primary");
              header.classList.add("bg-primary-50");
              svgPath.classList.add("fill-primary");
              h2Element.classList.add("before:!bg-primary");
          }
      });
  });
});

// visa-list _ visa


  // calendar
  
  
  const weekDaysFa = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
  const weekDaysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  function getWeekDay(gy, gm, gd) {
    let date = new Date(gy, gm - 1, gd);
    return [weekDaysEn[date.getDay()], weekDaysFa[date.getDay()]];
  }
  
  
  
  
  const monthsFa = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // تابع تشخیص کبیسه بودن برای شمسی و میلادی
  function isLeap(year, type) {
    if (type === 'grg') return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    return ((year % 33) === 1 || (year % 33) === 5 || (year % 33) === 9 || (year % 33) === 13 || (year % 33) === 17 || (year % 33) === 22 || (year % 33) === 26 || (year % 33) === 30);
  }
  
  function toShamsi(gy, gm, gd) {
    let g_d_m = [0, 31, (isLeap(gy, 'grg') ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gy_day_no = (gy - 1600) * 365 + Math.floor((gy - 1600 + 3) / 4) - Math.floor((gy - 1600 + 99) / 100) + Math.floor((gy - 1600 + 399) / 400);
    for (let i = 1; i < gm; i++) gy_day_no += g_d_m[i];
    gy_day_no += gd - 1;
  
    let j_day_no = gy_day_no - 79;
    let j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;
  
    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
    j_day_no %= 1461;
  
    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }
  
    let jm = (j_day_no < 186) ? 1 + Math.floor(j_day_no / 31) : 7 + Math.floor((j_day_no - 186) / 30);
    let jd = (j_day_no < 186) ? 1 + (j_day_no % 31) : 1 + ((j_day_no - 186) % 30);
  
    return [jy, jm, jd, monthsFa[jm - 1]];
  }
  
  function toGregorian(jy, jm, jd) {
    jy -= 979;
    let days = (jm <= 6) ? (jm - 1) * 31 + jd - 1 : 186 + (jm - 7) * 30 + jd - 1;
    let g_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4) + days + 79;
  
    let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
    g_day_no %= 146097;
  
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524);
      g_day_no %= 36524;
      if (g_day_no >= 365) g_day_no++;
    }
  
    gy += 4 * Math.floor(g_day_no / 1461);
    g_day_no %= 1461;
  
    if (g_day_no >= 366) {
      gy += Math.floor((g_day_no - 1) / 365);
      g_day_no = (g_day_no - 1) % 365;
    }
  
    let gm = 0, gd = g_day_no + 1;
    let g_days_in_month = [31, (isLeap(gy, 'grg') ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    while (gm < 12 && gd > g_days_in_month[gm]) gd -= g_days_in_month[gm++];
  
    return [gy, gm + 1, gd, monthsEn[gm]];
  }
  

  
  function convert() {
      let type = document.querySelector('input[name="calendar"]:checked').value;
      let year = parseInt(document.getElementById('year').value);
      let month = parseInt(document.getElementById('month').value);
      let day = parseInt(document.getElementById('day').value);
    
      if (!year || !month || !day) {
        alert('لطفاً تمام فیلدها را پر کنید.');
        return;
      }
    
      let resultGrg, resultShm, weekDayGrg, weekDayShm;
    
      if (type === 'shamsi') {
        resultGrg = toGregorian(year, month, day);
        weekDayGrg = getWeekDay(resultGrg[0], resultGrg[1], resultGrg[2])[0];
        resultShm = [year, month, day, monthsFa[month - 1]];
        weekDayShm = getWeekDay(resultGrg[0], resultGrg[1], resultGrg[2])[1];
      } else {
        resultShm = toShamsi(year, month, day);
        weekDayShm = getWeekDay(year, month, day)[1];
        resultGrg = [year, month, day, monthsEn[month - 1]];
        weekDayGrg = getWeekDay(year, month, day)[0];
      }
    


      if(window.innerWidth > 1024){
        document.getElementById('result').innerHTML = `
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-base">${weekDayGrg} , ${resultGrg[3]} (${resultGrg[1]}) , ${resultGrg[2]}  , ${resultGrg[0]}</div>
          <hr class="border-neutralcolor-800 block w-full  
          
          relative
          after:content-[''] 
          after:w-1 after:h-1 after:rounded-full after:bg-neutralcolor-800 after:inline-block 
          after:absolute after:top-0 after:left-0 after:bottom-0 after:-mt-[2.5px] before:content-[''] 
          before:w-1 before:h-1 before:rounded-full before:bg-neutralcolor-800 
          before:inline-block before:absolute before:top-0 before:right-0 before:bottom-0 
          before:-mt-[2.5px]
          
          ">
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-base">${weekDayShm} , ${resultShm[2]} , ${resultShm[3]} (${resultShm[1]}) , ${resultShm[0]}</div>
        `;
      }else{
        document.getElementById('result').innerHTML = `
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-xs">${weekDayGrg} , ${resultGrg[3]} (${resultGrg[1]}) , ${resultGrg[2]}  , ${resultGrg[0]}</div>
          <hr class="border-neutralcolor-800 block w-full  
          
          relative
          after:content-[''] 
          after:w-1 after:h-1 after:rounded-full after:bg-neutralcolor-800 after:inline-block 
          after:absolute after:top-0 after:left-0 after:bottom-0 after:-mt-[2.5px] before:content-[''] 
          before:w-1 before:h-1 before:rounded-full before:bg-neutralcolor-800 
          before:inline-block before:absolute before:top-0 before:right-0 before:bottom-0 
          before:-mt-[2.5px]
          
          ">
          <div class="text-primary-900 font-yekanbakhsemiboldFA text-xs">${weekDayShm} , ${resultShm[2]} , ${resultShm[3]} (${resultShm[1]}) , ${resultShm[0]}</div>
        `;
      }
    }
    
    
  function fillOptions(select, start, end) {
    select.innerHTML = '';
    for (let i = start; i >= end; i--) {
      select.innerHTML += `<option>${i}</option>`;
    }
  }
  
  function updateYears() {
    let type = document.querySelector('input[name="calendar"]:checked').value;
    let yearSelect = document.getElementById('year');
    fillOptions(yearSelect, type === 'shamsi' ? 1500 : 2100, type === 'shamsi' ? 1300 : 1900);
  }
  
  function updateMonths() {
    let type = document.querySelector('input[name="calendar"]:checked').value;
    let monthSelect = document.getElementById('month');
    let months = (type === 'shamsi') ? monthsFa : monthsEn; // بررسی نوع تقویم
    monthSelect.innerHTML = months.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');
  }
  
  function updateDays() {
    let daySelect = document.getElementById('day');
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);
    let type = document.querySelector('input[name="calendar"]:checked').value;
  
    let days = (month <= 6) ? 31 : (month <= 11 ? 30 : (type === 'shamsi' ? (isLeap(year, 'hsh') ? 30 : 29) : (isLeap(year, 'grg') ? 29 : 28)));
    fillOptions(daySelect, days, 1);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById("date-convertor")){
      updateYears();
      updateMonths();
      updateDays();
    }
  });
  
  
  // date-convertor
  
  if(document.getElementById("date-convertor")){
      const labels = document.querySelectorAll('label[name="calendar-label"]');
      
      labels.forEach(label => {
          label.addEventListener('click', () => {
              labels.forEach(l => l.classList.remove('bg-secondary', 'bg-white', 'text-white'));
              label.classList.add('bg-secondary' , 'text-white');
              labels.forEach(l => {
                  if (l !== label) {
                      l.classList.add('bg-white');
                  }
              });
          });
      });
  }
  
  
  // calendar

  // date convertor and magazine share button

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

    // date convertor and magazine share button


    // magic line desktop
if(document.getElementById("main-nav")){
  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("main-nav");
    const items = nav.querySelectorAll("li > a, li > span");
    const magicLine = document.getElementById("magic-line");

    items.forEach(item => {
        item.addEventListener("mouseenter", (e) => {
            const rect = item.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            magicLine.style.width = `${rect.width}px`;
            magicLine.style.height = `4px`;
            magicLine.style.left = `${rect.left - navRect.left}px`;
        });
    });

    nav.addEventListener("mouseleave", () => {
        magicLine.style.width = "0px";
        magicLine.style.height = `0px`;

    });
});
}
    // magic line desktop

    // header menu functions - mobile
    



function moveModalAfterHeader() {
  const modal = document.querySelector(".user-entrance-body");
  const header = document.getElementById("header-contents");

  if (modal && header) {
    header.insertAdjacentElement("afterend", modal);
  } else {
    // اگه هنوز لود نشده‌ن، دوباره امتحان کن
    setTimeout(moveModalAfterHeader, 100);
  }
}

document.addEventListener("DOMContentLoaded", moveModalAfterHeader);

  
      function closeAllMenuBoxes(){
          document.querySelectorAll(".hamburgermenu-submenu").forEach(el => {
          el.classList.add("hidden");
      });
      
      document.querySelectorAll(".rotate-arrow-hm").forEach(el => {
          el.classList.remove("-scale-y-100");
      });
      }
  
      function OpenHamburgerMenu(element, menuContainer) {
          closeAllMenuBoxes();
      element.closest("div").querySelector(".hamburger-menu-closed").classList.toggle("hidden");
      element.closest("div").querySelector(".hamburger-menu-opened").classList.toggle("hidden");
  
      let menu = document.querySelector(menuContainer);
      let menuItems = menu.querySelector(".hamburgermenu-items");
  
      menu.classList.remove("hidden"); // نمایش منو
      menu.classList.add("flex"); // نمایش با flex اما بدون تغییر translate
  
      setTimeout(() => {
          menuItems.classList.remove("translate-x-full");
          menuItems.classList.add("translate-x-0");
      }, 10); // تاخیر برای اعمال transition
  }
  
  function closeHamburgerMenu(element, headerContainer, menuContainer) {
      closeAllMenuBoxes();
      let menu = document.querySelector(menuContainer);
      let menuItems = menu.querySelector(".hamburgermenu-items");
  
      document.querySelector(headerContainer).querySelector(".hamburger-menu-closed").classList.remove("hidden");
      document.querySelector(headerContainer).querySelector(".hamburger-menu-opened").classList.add("hidden");
  
      menuItems.classList.remove("translate-x-0");
      menuItems.classList.add("translate-x-full");
  
  
  
      
  
  
      setTimeout(() => {
          menu.classList.add("hidden");
          menu.classList.remove("flex");
      }, 600); // مدت زمان برابر با transition در Tailwind
  }
  
  function openSubMenu(element){
      element.closest("li").querySelector(".hamburgermenu-submenu").classList.toggle("hidden");
      element.querySelector(".rotate-arrow-hm").classList.toggle("-scale-y-100");
  }
  
  const bodyClass = document.body.className;
  
  const activeMap = {
      "page-tours": "tours",
      "page-hotels": "hotels",
      "page-home": "home",
      "page-magazine": "magazine"
  };
  
  const activeTab = Object.entries(activeMap).find(([cls]) => bodyClass.includes(cls))?.[1];
  
  document.addEventListener("DOMContentLoaded", function () {
      const tabs = document.querySelectorAll('.bmi-tab');
  
      tabs.forEach(tab => {
          const pageKey = tab.getAttribute('data-page');
          if (pageKey === window.activeTab) {
              tabs.forEach(t => {
                  t.querySelector('.tab-text').classList.remove('text-primary');
                  t.querySelector('.bmi-active-btn').classList.add('hidden');
                  t.querySelector('.bmi-simple-btn').classList.remove('hidden');
              });
              tab.querySelector('.tab-text').classList.add('text-primary');
              tab.querySelector('.bmi-active-btn').classList.remove('hidden');
              tab.querySelector('.bmi-simple-btn').classList.add('hidden');
          }
      });
  });

  function CloseFloatingCall(element) {
      element.closest("div.fixed").classList.add("hidden");
  }
  
    // header menu functions - mobile


    // visa-list
if(document.getElementById("visa-list-page")){
  const h2 = document.querySelector('.section-service');
  const box = h2?.previousElementSibling;
  
  if (box && h2) {
    const boxBg = window.getComputedStyle(box).backgroundColor;
    h2.querySelector("h2").style.backgroundColor = boxBg;
  }

}




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
    // visa-list

    // hotel-list

    function openModalBottom(id) {

      console.log("test: " , id)
      const modalOverlay = document.getElementById("modal-overlay");
      const modalContent = document.getElementById(id);
    
      if (!modalOverlay || !modalContent) return;
    
      // نمایش بک‌دراپ
      modalOverlay.classList.remove("hidden");
      modalOverlay.classList.add("flex");
    
      // نمایش مدال با انیمیشن
      setTimeout(() => {
        modalContent.classList.remove("translate-y-full");
        modalContent.classList.add("translate-y-0");
      }, 10); // یه تأخیر کوچیک تا ترنزیشن درست اجرا بشه
    
      // بستن مدال با کلیک روی بک‌دراپ
      modalOverlay.addEventListener("click", function handleClickOutside(e) {
        if (e.target === modalOverlay) {
          modalContent.classList.remove("translate-y-0");
          modalContent.classList.add("translate-y-full");
    
          // بعد از انیمیشن مخفیش کن
          setTimeout(() => {
            modalOverlay.classList.remove("flex");
            modalOverlay.classList.add("hidden");
          }, 300);
    
          modalOverlay.removeEventListener("click", handleClickOutside);
        }
      });
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

  

  document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.list-categories input[type="checkbox"]');
    const resultContainer = document.querySelector("#resultContainer");
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchForm input[name='q']");
  
    if (checkboxes.length > 0) {
      checkboxes.forEach((checkbox, index) => {
        const categoryId = checkbox.id;
        const typeid = checkbox.getAttribute("typeid");
  
        if (index === 0) {
          checkbox.checked = true; // اولین چک‌باکس تیک خورده
          fetch(`load-items.bc?catid=${categoryId}&typeid=${typeid}`, {
            method: "GET",
          })
            .then((res) => res.text())
            .then((data) => {
              let itemWrapper = document.createElement("div");
              itemWrapper.classList.add("categoryItem", "flex", "justify-start", "gap-y-5", "flex-wrap");
              itemWrapper.setAttribute("data-id", categoryId);
              itemWrapper.innerHTML = data;
              resultContainer.appendChild(itemWrapper);
            });
        } else {
          checkbox.checked = false; // بقیه چک‌باکس‌ها تیک نخورده باشن
        }
  
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            fetch(`load-items.bc?catid=${categoryId}&typeid=${typeid}`, {
              method: "GET",
            })
              .then((res) => res.text())
              .then((data) => {
                let itemWrapper = document.createElement("div");
                itemWrapper.classList.add("categoryItem", "flex", "justify-start", "gap-y-5", "flex-wrap");
                
                if(typeid === 'article'){
                  itemWrapper.classList.add("gap-x-11");
                }
                if(typeid === 'hotel'){
                  itemWrapper.classList.add("mt-5");
                }
                itemWrapper.setAttribute("data-id", categoryId);
                itemWrapper.innerHTML = data;
                resultContainer.appendChild(itemWrapper);
              });
          } else {
            const item = resultContainer.querySelector(`[data-id="${categoryId}"]`);
            if (item) {
              item.remove();
            }
          }
        });
      });
    }else if(document.querySelector("#resultContainer-mainlist")){
  
      const maincategoryId = document.querySelector("#resultContainer-mainlist").getAttribute('catid');
      const maintypeid = document.querySelector("#resultContainer-mainlist").getAttribute('typeid');
      const resultContainermain = document.querySelector("#resultContainer-mainlist");
        fetch(`load-items.bc?catid=${maincategoryId}&typeid=${maintypeid}`, {
          method: "GET",
        })
          .then((res) => res.text())
          .then((data) => {
            let itemWrapper = document.createElement("div");
            itemWrapper.classList.add("categoryItem", "flex", "justify-start", "gap-y-5", "flex-wrap");
            itemWrapper.setAttribute("data-id", maincategoryId);
            itemWrapper.innerHTML = data;
            resultContainermain.appendChild(itemWrapper);
          });
    }
  
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchText = searchInput.value;
        const searchType = searchInput.getAttribute("searchtype");
  
        if (searchText.trim() !== "") {
          resultContainer.innerHTML = ""; // پاک کردن نتایج قبلی
          fetch(`load-items.bc?q=${encodeURIComponent(searchText)}&searchtype=${searchType}`, {
            method: "GET",
          })
            .then((res) => res.text())
            .then((data) => {
              let itemWrapper = document.createElement("div");
              itemWrapper.classList.add("searchItem", "flex", "justify-start", "gap-y-5", "flex-wrap");
              itemWrapper.innerHTML = data;
              resultContainer.appendChild(itemWrapper);
            });
        }
      });
    }
    

    const starFilters = document.querySelectorAll("#star-categories .star-filter");

function getSelectedStars() {
  return Array.from(starFilters)
    .filter(el => el.classList.contains("bg-primary-100"))
    .map(el => el.getAttribute("data-star"));
}

// function filterItemsByStars() {
//   const selectedStars = getSelectedStars();
//   const allItems = resultContainer.querySelectorAll(".hotelCard");

//   allItems.forEach(item => {
//     const itemStars = item.getAttribute("data-stars");
//     if (selectedStars.length === 0 || selectedStars.includes(itemStars)) {
//       item.style.display = ""; // نمایش
//     } else {
//       item.style.display = "none"; // مخفی
//     }
//   });
// }

function filterVisibleHotelsByStars() {
  const selectedStars = getSelectedStars();

  // همه آیتم‌های هتل که ستاره دارند
  const allHotelItems = resultContainer.querySelectorAll(".hotelCard");

  allHotelItems.forEach(item => {
    const itemStars = item.getAttribute("data-stars");
    if (selectedStars.length === 0 || selectedStars.includes(itemStars)) {
      item.style.display = ""; // نمایش بده
    } else {
      item.style.display = "none"; // مخفی کن
    }
  });
}

// toggle انتخاب ستاره و اعمال فیلتر
starFilters.forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("bg-primary-100");
    filterVisibleHotelsByStars();
  });
});

  });





  
    // hotel-list

    // blog
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
  


    if (document.querySelector(".passengers-video") || document.getElementById("podcastandvideo") || document.getElementById("articles-video")) {
      document.addEventListener("DOMContentLoaded", function () {
          const videoModal = document.getElementById("videoModal");
          const closeModal = document.getElementById("closeModal");
          const videoContainer = document.getElementById("videoContainer");
    
          // اسلایدر Swiper
          if(document.querySelector(".passengers-video")){
            new Swiper(".passengers-video", {
                slidesPerView: 'auto',
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
          }
    
          // باز کردن مودال و افزودن آیفریم
          // document.querySelectorAll(".openModal").forEach(item => {
          //     item.addEventListener("click", function () {
          //         const embedCode = this.getAttribute("data-embed");
          //         if (embedCode) {
          //             videoContainer.innerHTML = embedCode;
          //             videoModal.classList.remove("hidden");
          //         }
          //     });
          // });
    
    
          document.querySelectorAll(".openModal").forEach(item => {
            item.addEventListener("click", async function () {
                const videoId = this.getAttribute("data-id"); // گرفتن آیدی دکمه
    
                if (videoId) {
    
                    try {
                        // فچ کردن از لینک
                        const response = await fetch(`load-items.bc?id=${videoId}&typecard=video`);
                        const embedCode = await response.text(); // دریافت رشته متنی
    
                        if (embedCode.startsWith("http")) {
                          if(window.innerWidth > 1024){
                            videoContainer.innerHTML = `<iframe width="1230" height="700" src="${embedCode}" allowfullscreen></iframe>`;
                          }else{
                            videoContainer.innerHTML = `<iframe class="absolute inset-0 w-full h-full object-contain"  src="${embedCode}" allowfullscreen frameborder="0"></iframe>`;
    
                          }
                            videoModal.classList.remove("hidden");
                        }
                    } catch (error) {
                        console.log("خطا در دریافت ویدئو:", error);
                    }
                }
            });
        });
    
        
    
          // بستن مودال
          function closeVideoModal() {
              videoModal.classList.add("hidden");
              videoContainer.innerHTML = "";
          }
    
          closeModal.addEventListener("click", closeVideoModal);
          videoModal.addEventListener("click", function (event) {
              if (event.target === videoModal) {
                  closeVideoModal();
              }
          });
      });
    }

    
    // blog

    // hotel
    function openGallery() {
      document.getElementById('galleryModal').classList.remove('hidden');
    }
  
    function closeGallery() {
      document.getElementById('galleryModal').classList.add('hidden');
    }
    // hotel