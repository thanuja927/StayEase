/*========================================================
                STAYEASE PROFILE JAVASCRIPT
========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================================
                    STAT COUNTER
    ====================================================*/

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const speed = target / 80;

        function updateCounter() {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        }

        updateCounter();

    });


    /*====================================================
                    SIDEBAR ACTIVE
    ====================================================*/

    const menuItems = document.querySelectorAll(".sidebar-menu li");

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            menuItems.forEach(menu => {

                menu.classList.remove("active");

            });

            item.classList.add("active");

        });

    });


    /*====================================================
                    HERO ANIMATION
    ====================================================*/

    const hero = document.querySelector(".hero-card");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(40px)";

    setTimeout(() => {

        hero.style.transition = "0.8s ease";

        hero.style.opacity = "1";

        hero.style.transform = "translateY(0)";

    }, 200);


    /*====================================================
                    FADE CARDS
    ====================================================*/

    const cards = document.querySelectorAll(

        ".info-card, .booking-card, .feature-card"

    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition = "0.6s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 180);

    });


    /*====================================================
                    PROFILE IMAGE
    ====================================================*/

    const profile = document.querySelector(".profile-wrapper img");

    profile.addEventListener("mouseenter", () => {

        profile.style.transform = "scale(1.05)";
        profile.style.transition = ".4s";

    });

    profile.addEventListener("mouseleave", () => {

        profile.style.transform = "scale(1)";

    });


    /*====================================================
                    EDIT PROFILE
    ====================================================*/

    const editProfile = document.querySelector(".edit-profile");

    editProfile.addEventListener("click", () => {

        alert("Edit Profile feature will be available soon.");

    });


    /*====================================================
                    CAMERA BUTTON
    ====================================================*/

    const cameraBtn = document.querySelector(".camera-btn");

    cameraBtn.addEventListener("click", () => {

        alert("Upload Profile Picture feature coming soon.");

    });


    /*====================================================
                    LOGOUT
    ====================================================*/

    const logoutBtn = document.querySelector(".logout-btn");

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Do you want to logout?");

        if (confirmLogout) {

            window.location.href = "login.html";

        }

    });


    /*====================================================
                    NOTIFICATION
    ====================================================*/

    const bell = document.querySelector(".notification-btn");

    bell.addEventListener("click", () => {

        alert("No new notifications.");

    });


    /*====================================================
                    FEATURE BUTTONS
    ====================================================*/

    const featureButtons = document.querySelectorAll(".feature-card button");

    featureButtons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-3px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0)";

        });

    });


    /*====================================================
                    BOOKING HOVER
    ====================================================*/

    const bookings = document.querySelectorAll(".booking-item");

    bookings.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.transform = "translateX(8px)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "translateX(0)";

        });

    });


    /*====================================================
                    INFO ROW HOVER
    ====================================================*/

    const rows = document.querySelectorAll(".info-row");

    rows.forEach(row => {

        row.addEventListener("mouseenter", () => {

            row.style.paddingLeft = "10px";
            row.style.transition = ".3s";

        });

        row.addEventListener("mouseleave", () => {

            row.style.paddingLeft = "0";

        });

    });


    /*====================================================
                    STAT CARD HOVER
    ====================================================*/

    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px) scale(1.03)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0) scale(1)";

        });

    });


    /*====================================================
                    NAVBAR SHADOW
    ====================================================*/

    window.addEventListener("scroll", () => {

        const navbar = document.querySelector(".navbar");

        if (window.scrollY > 20) {

            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,.06)";

        }

    });


    /*====================================================
                    FEATURE CARD CLICK
    ====================================================*/

    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach(card => {

        card.addEventListener("click", () => {

            const title = card.querySelector("h3").innerText;

            alert(title + " page will be available soon.");

        });

    });


    /*====================================================
                    TOP PROFILE MENU
    ====================================================*/

    const topProfile = document.querySelector(".top-profile");

    topProfile.addEventListener("click", () => {

        alert("Profile menu coming soon.");

    });

});