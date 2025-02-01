function openMegaMenu(navbarclicked , megamenuclass){
    let megamenubox = navbarclicked.closest("li").querySelector("."+megamenuclass);

    // console.log(navbarclicked.closest("li"));
    // console.log(navbarclicked);
    // console.log(megamenubox);

    megamenubox.classList.toggle("!block");
    navbarclicked.classList.toggle("active-menu-item");
}