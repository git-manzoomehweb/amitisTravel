// searchbox  

// load searchbox
document.addEventListener("DOMContentLoaded", function () {
    try {
   var xhrobj = new XMLHttpRequest();
   xhrobj.open('GET', 'search-engine.bc');
   xhrobj.send();

   xhrobj.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
           var container = document.getElementById('search-box');
           container.innerHTML = xhrobj.responseText;

           var scripts = container.getElementsByTagName("script");
           for (var i = 0; i < scripts.length; i++) {
               var scriptTag = document.createElement("script");
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
   console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
}
})

function syncDropdownHeight() {
    const flightClassBoxFlight = document.querySelector(".r-flight .FlightClass");
    const passengerBoxFlight = document.querySelector(".r-flight .passengerbox");
    const flightClassBoxFlightHotel = document.querySelector(".r-flighthotel .FlightClass");
    const passengerBoxFlightHotel = document.querySelector(".r-flighthotel .passengerbox");

    if (!flightClassBoxFlight || !passengerBoxFlight || !flightClassBoxFlightHotel || !passengerBoxFlightHotel) return;

    // ابتدا ارتفاع را به `auto` تغییر دهیم تا مرورگر مقدار جدید را اعمال کند
    flightClassBoxFlight.style.height = "auto";
    passengerBoxFlight.style.height = "auto";
    flightClassBoxFlightHotel.style.height = "auto";
    passengerBoxFlightHotel.style.height = "auto";

    // مقدار واقعی ارتفاع را از `scrollHeight` بگیریم
    const maxHeightFlight = Math.max(passengerBoxFlight.scrollHeight, flightClassBoxFlight.scrollHeight);
    const maxHeightFlightHotel = Math.max(passengerBoxFlightHotel.scrollHeight, flightClassBoxFlightHotel.scrollHeight);
    const maxHeight = Math.max(maxHeightFlight, maxHeightFlightHotel);

    // تنظیم ارتفاع یکسان برای هر دو باکس
    flightClassBoxFlight.style.height = maxHeight + "px";
    passengerBoxFlight.style.height = maxHeight + "px";
    flightClassBoxFlightHotel.style.height = maxHeight + "px";
    passengerBoxFlightHotel.style.height = maxHeight + "px";
}

// مانیتور کردن تغییر ارتفاع با ResizeObserver
const resizeObserver = new ResizeObserver(() => {
    syncDropdownHeight();
});

// اضافه کردن observer به هر دو باکس
document.addEventListener("DOMContentLoaded", function () {
    const flightClassBoxFlight = document.querySelector(".r-flight .FlightClass");
    const passengerBoxFlight = document.querySelector(".r-flight .passengerbox");
    const flightClassBoxFlightHotel = document.querySelector(".r-flighthotel .FlightClass");
    const passengerBoxFlightHotel = document.querySelector(".r-flighthotel .passengerbox");

    if (flightClassBoxFlight && passengerBoxFlight && flightClassBoxFlightHotel && passengerBoxFlightHotel) {
        resizeObserver.observe(flightClassBoxFlight);
        resizeObserver.observe(passengerBoxFlight);
        resizeObserver.observe(flightClassBoxFlightHotel);
        resizeObserver.observe(passengerBoxFlightHotel);
    }
});



document.addEventListener("click", function (event) {
    console.log(event.target);
    console.log(event.target.closest(".passenger-birthday-dropdown"));

    console.log("1");
    const validForms = [".r-flight", ".r-flighthotel"];
    const clickedForm = event.target.closest(validForms.join(","));

    console.log("2");



    if (!clickedForm) {
        console.log("13 - کلیک خارج از فرم‌های معتبر، تابع اجرا نمی‌شود");
        return;
    }

    console.log("3");

    if (event.target.closest(".flightclass-field, .passengers-field")) {
        setTimeout(syncDropdownHeight, 10);
    }

    const flightClassBox = clickedForm.querySelector(".FlightClass");
    const passengerBox = clickedForm.querySelector(".passengerbox");
    const flightClassTrigger = event.target.closest(".flightclass-field");
    const passengerTrigger = event.target.closest(".passengers-field");

    console.log("4");

    if (!flightClassBox || !passengerBox) return;
    console.log("5");

    if (event.target.closest(".passenger-item ul li")) {
        console.log("10");
        event.stopPropagation();
        return;
    }

    document.querySelectorAll(".passengerbox").forEach((box) => {
        box.addEventListener("click", function (event) {
            if (event.target.tagName.toLowerCase() === "select") {
                event.stopPropagation();
            }
        });
    });

    if (flightClassTrigger || passengerTrigger) {
        const isFlightClassOpen = !flightClassBox.classList.contains("hidden");
        const isPassengerBoxOpen = !passengerBox.classList.contains("hidden");
        console.log("6");

        if (isFlightClassOpen && isPassengerBoxOpen) {
            flightClassBox.classList.add("hidden");
            passengerBox.classList.add("hidden");
            console.log("7");
        } else {
            flightClassBox.classList.remove("hidden");
            passengerBox.classList.remove("hidden");
            console.log("8");
        }
        event.stopPropagation();
        return;
    }

    console.log("9");

    if (event.target.closest(".FlightClass, .passengerbox")) {
        console.log("12");
        event.stopPropagation();
        return;
    }



    console.log("13 - کلیک خارج از باکس‌ها، دراپ‌داون‌ها بسته می‌شوند");
    flightClassBox.classList.add("hidden");
    passengerBox.classList.add("hidden");
});

document.addEventListener("click", function (event) {



    if (event.target.closest("#multi")) {
        setTimeout(() => {
            const container = document.querySelector(".multiroute-fields");
            const addDestinationBtn = document.querySelector(".multiroute-fields > .Flightclass-Passenger");
            const removeBtn = document.querySelector(".multiroute-fields > .reserve-field");
            const searchBtn = document.querySelector(".multiroute-fields > .reserve-search");

            console.log(container, addDestinationBtn, removeBtn, searchBtn);

            if (container && addDestinationBtn && removeBtn && searchBtn) {
                console.log("multi changeeeeeeeeeeeeeee");
                
                container.prepend(addDestinationBtn);
                container.appendChild(searchBtn);
                container.appendChild(removeBtn);
            }
        }, 300); // 300 میلی‌ثانیه صبر می‌کند تا المان‌ها در DOM ظاهر شوند
    }







    const invalidForms = [".r-flight", ".r-flighthotel"];
    const clickedForm = event.target.closest(invalidForms.join(","));

    if (clickedForm) return;

            // بررسی کلیک در داخل تقویم
            if (event.target.closest(".passenger-birthday-dropdown")) { // فرض می کنیم کلاس تقویم calendar-container است
                console.log("14 - کلیک در داخل تقویم، دراپ‌داون بسته نمی‌شود");
                event.stopPropagation();
                return;
            }

    document
        .querySelectorAll(".reserve-field.flightclass-field")
        .forEach((field) => {
            let ul = field.querySelector("ul.FlightClass");

            if (!field.contains(event.target)) {
                ul.classList.add("hidden");
            }
        });
});

document.addEventListener("click", function (event) {
    const invalidForms = [".r-flight", ".r-flighthotel"];
    const clickedForm = event.target.closest(invalidForms.join(","));

    if (clickedForm) return;

            // بررسی کلیک در داخل تقویم
            if (event.target.closest(".passenger-birthday-dropdown")) { // فرض می کنیم کلاس تقویم calendar-container است
                console.log("14 - کلیک در داخل تقویم، دراپ‌داون بسته نمی‌شود");
                event.stopPropagation();
                return;
            }


    document.querySelectorAll(".passengers-field").forEach((field) => {
        let ul = field.querySelector(".passengerbox");

        if (!field.contains(event.target)) {
            ul.classList.add("hidden");
        }
    });
});

// searchbox