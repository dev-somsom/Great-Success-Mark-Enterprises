const products = [
    {
        name: "Kitchen Sinks",
        description: "Modern and durable sink solutions.",
        page: "kitchen_sinks.html"
    },
    {
        name: "Shower Systems",
        description: "Modern shower systems.",
        page: "Shower_systems.html"
    },
    {
        name: "Wash Basins",
        description: "Stylish wash basins.",
        page: "wash_basins.html"
    },
    {
        name: "Water Closets",
        description: "Modern WC solutions.",
        page: "water_closet.html"
    },
    {
        name: "Wall Tiles",
        description: "Premium wall tiles.",
        page: "wall_n_floor_tiles.html"
    },
    {
        name: "Bathroom Accessories",
        description: "Accessories for every bathroom.",
        page: "bathroom.html"
    },
    {
        name: "Pipes and Fittings",
        description: "Quality pipes and fittings.",
        page: "pipes_n_fitting.html"
    }
];

//navbar
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

const overlay =
document.getElementById("overlay");

menuBtn.addEventListener("click", ()=>{

    navLinks.classList.toggle("active");

    overlay.classList.toggle("show");

    document.body.classList.toggle("no-scroll");
});

overlay.addEventListener("click", ()=>{

    navLinks.classList.remove("active");

    overlay.classList.remove("show");

    document.body.classList.remove("no-scroll");
});

const navItems =
document.querySelectorAll(".nav-links a");

navItems.forEach(link=>{

    link.addEventListener("click", ()=>{

        navLinks.classList.remove("active");

        overlay.classList.remove("show");

    });

});


const sections =
document.querySelectorAll(".fade-in");

const observer =
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

sections.forEach(section => {
  observer.observe(section);
});

const form =
document.getElementById("quoteForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const message =
    document.getElementById("message").value.trim();

    if(name.length < 2){
        showError("Please enter a valid name.");
        return;
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        showError("Please enter a valid email.");
        return;
    }

    if(phone.length < 10){
        showError("Please enter a valid phone number.");
        return;
    }

    if(message.length < 10){
        showError("Please provide more details.");
        return;
    }

    showSuccess(
        "Thank you! Your quote request has been sent."
    );

});

//Product Search Bar
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const content = document.getElementById("searchContent");

if(searchInput){

    searchInput.addEventListener("input", function(){

        const searchTerm = this.value.toLowerCase().trim();

        searchResults.innerHTML = "";

        if(searchTerm === ""){

            searchResults.style.display = "none";
            content.classList.remove("blur");
            return;

        }

        content.classList.add("blur");

        const matches = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        if(matches.length === 0){

            searchResults.innerHTML = `
                <div class="search-item">
                    <p>No products found.</p>
                </div>
            `;

            searchResults.style.display = "block";
            return;

        }

        matches.forEach(product=>{

            const item = document.createElement("div");

            item.classList.add("search-item");

            item.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            `;

            item.addEventListener("click", ()=>{

                window.location.href = product.page;

            });

            searchResults.appendChild(item);

        });

        searchResults.style.display = "block";

    });

}

document.addEventListener("click", function(e){

    if(!e.target.closest(".product-search")){

        searchResults.style.display = "none";

        searchInput.value = "";

        content.classList.remove("blur");

    }

});
document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        searchInput.value = "";

        searchResults.style.display = "none";

        content.classList.remove("blur");

    }

});

//Back To Top
const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", function(){

    if(window.scrollY > 300){
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", function(){

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const track = document.querySelector(".review-track");
const cards = document.querySelectorAll(".reviews-card");

let current = 0;

function updateSlider(){

    track.style.transform =
        `translateX(-${current * 100}%)`;

}

document.getElementById("nextBtn")
.addEventListener("click", ()=>{

    current++;

    if(current >= cards.length){
        current = 0;
    }

    updateSlider();

});

document.getElementById("prevBtn")
.addEventListener("click", ()=>{

    current--;

    if(current < 0){
        current = cards.length - 1;
    }

    updateSlider();

});


