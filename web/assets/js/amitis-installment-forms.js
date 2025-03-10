
let rangeInput ;
let amountInput ;
let firstsuggest ;
let loanAmount ;
let loanMonths ;
let interestRate ;

document.addEventListener("DOMContentLoaded", function () {
     rangeInput = document.getElementById('myRange');
     amountInput = document.getElementById('amount');
    
    rangeInput.addEventListener('input', updateRangeBackground);
     firstsuggest = document.getElementById("firstsuggest");
     loanAmount = 10;
     loanMonths = firstsuggest.getAttribute("month");
     interestRate = firstsuggest.getAttribute("rate");
     updateRangeBackground();

    console.log(loanAmount)

});



function updateRangeBackground() {
    const value = rangeInput.value;
    const min = rangeInput.min;
    const max = rangeInput.max;
    const percentage = ((value - min) / (max - min)) * 100;
    rangeInput.style.background = `linear-gradient(to right, #48a392 ${percentage}%, #e5e7eb ${percentage}%)`;
    amountInput.value = value;
}

function updateLoanAmount(amount) {
    loanAmount = amount;
    document.getElementById('myRange').value = amount;
    updateRangeBackground();
    calculateInstallments();
}

function updateLoanFromRange(amount) {
    console.log(amount)
    loanAmount = amount;
    document.getElementById('amount').value = amount;
    updateRangeBackground();
    calculateInstallments();
}

function increase(limit) {
    loanAmount = Math.min(parseInt(loanAmount) + 1, limit);
    document.getElementById('amount').value = loanAmount;
    document.getElementById('myRange').value = loanAmount;
    calculateInstallments();
    updateRangeBackground();
}

function decrease() {
    loanAmount = Math.max(parseInt(loanAmount) - 1, 10);
    document.getElementById('amount').value = loanAmount;
    document.getElementById('myRange').value = loanAmount;
    calculateInstallments();
    updateRangeBackground();
}

function calculateMonth(months, interestrate, element) {

    const allTabs = document.querySelectorAll('#month-list li');
    allTabs.forEach(function (tab) {
        tab.classList.remove('bg-primary-400');
        tab.classList.add('bg-neutralcolor-100');

        tab.classList.add('text-neutralcolor-900');
        tab.classList.remove('text-white');
    });

    element.classList.remove('text-neutralcolor-900');
    element.classList.add('text-white');

    element.classList.remove('bg-neutralcolor-100');
    element.classList.add('bg-primary-400');

    loanMonths = months;
    interestRate = interestrate;
    calculateInstallments();
}

function calculateInstallments() {
    const totalAmount = loanAmount * 1000000;
    const totalAmountWithFacilities = totalAmount + (totalAmount * interestRate);
    const installmentAmount = totalAmountWithFacilities / loanMonths;
    installmentAmountceil = Math.ceil(installmentAmount);
    document.querySelector('.total-amount').textContent = totalAmount.toLocaleString();
    document.querySelector('.Total-amount-facilities').textContent = totalAmountWithFacilities.toLocaleString();
    document.querySelector('.amount-each-installment').textContent = installmentAmountceil.toLocaleString();
}

updateRangeBackground();
calculateInstallments();



// freeform functions
async function RenderForm() {
    document.getElementById("signup-form-lachinseir").querySelector(".name-family-form").querySelector("input").placeholder = "نام و نام خانوادگی";
    document.getElementById("signup-form-lachinseir").querySelector(".phone-number-form").querySelector("input").placeholder = "شماره تماس";
    document.getElementById("signup-form-lachinseir").querySelector(".email-address-form").querySelector("input").placeholder = "ایمیل";
    document.getElementById("signup-form-lachinseir").querySelector(".job-title-form").querySelector("input").placeholder = "شغل";
    }
    
    function uploadDocument(args) {
    const captcha = document.getElementById("signup-form-lachinseir").querySelector(" input[name='captcha']").value;
    const captchaid = document.getElementById("signup-form-lachinseir").querySelector(" input[name='captchaid']").value;
    const stringJson = JSON.stringify(args.source?.rows[0]);
    $bc.setSource("cms.upload", {
        value: stringJson,
        captcha: captcha,
        captchaid: captchaid,
        run: true
    });
    };
    
    function refreshCaptcha(e) {
    $bc.setSource("captcha.refresh", true);
    }
    
    function captchaRendered() {
    document.querySelector(".contactUsInput").placeholder = "کد امنیتی";
    }
    
    async function OnProcessedEditObject(args) {
    var response = args.response;
    var json = await response.json();
    var errorid = json.errorid;
    if (errorid == "6") {
        document.getElementById("signup-form-lachinseir").querySelector(".message-api").innerHTML = "درخواست شما با موفقیت ثبت شد";    
    refreshCaptcha();
    location.reload()
    } else {
        refreshCaptcha()
        location.reload()       
        setTimeout(() => {
            document.getElementById("signup-form-lachinseir").querySelector(".message-api").innerHTML = "خطایی رخ داده, لطفا مجدد اقدام کنید";
        }, 2000);
    }
    }


    function toggleModalSignup() {
        document.getElementById('modal-signup-background').classList.toggle('hidden');
    }
    
    document.getElementById('modal-signup-background').addEventListener('click', function(e) {
        if(e.target === document.getElementById('modal-signup-background')) {
            toggleModalSignup(); 
        }
    });

    function openSignupInstallmentForm() {
        document.getElementById('modal-signup-background').classList.toggle('hidden');
    }
    


    // ابتدا همه سکشن‌ها و آیتم‌های سایدبار را انتخاب کنید
let sections = document.querySelectorAll('#section div[id]');
let sidebarItems = document.querySelectorAll('#sidebar a');

console.log(sidebarItems);
// تابعی برای اکتیو کردن آیتم مناسب در سایدبار
function activateSidebarItem() {
    console.log(sidebarItems);
    let scrollPosition = window.scrollY;

    console.log(sections.length);
console.log(sidebarItems.length);


    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 50; // مقدار -50 برای اضافه کردن مقداری فاصله از بالای صفحه
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // حذف کلاس اکتیو از همه آیتم‌ها
            // sidebarItems.forEach(item => item.closest("li").classList.remove('bg-primary-500'));
            sidebarItems.forEach(item => {
                item.closest("li").classList.remove('bg-primary-500');
                item.closest("li").classList.remove('text-white');
                item.closest("li").classList.add('bg-neutralcolor-100');
                item.closest("li").classList.add('text-neutralcolor-900');
            });

            console.log(index);
            console.log(sidebarItems[index]);
            // اضافه کردن کلاس اکتیو به آیتم مرتبط
            sidebarItems[index].closest("li").classList.remove('bg-neutralcolor-100');
            sidebarItems[index].closest("li").classList.remove('text-neutralcolor-900');
            sidebarItems[index].closest("li").classList.add('bg-primary-500');
            sidebarItems[index].closest("li").classList.add('text-white');
        }
    });
}

// این تابع را به رویداد اسکرول اضافه کنید
window.addEventListener('scroll', activateSidebarItem);
