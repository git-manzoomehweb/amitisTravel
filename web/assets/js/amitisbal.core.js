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




