/*======================================================
                SELECT ELEMENTS
======================================================*/

const removeButtons = document.querySelectorAll(".remove-btn");

const favoriteCards = document.querySelectorAll(".favorite-card");

const emptyFavorites = document.getElementById("empty-favorites");

const favoriteSection = document.querySelector(".favorite-section");


/*======================================================
                REMOVE FAVORITE
======================================================*/

removeButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const confirmDelete = confirm("Remove this hotel from your Favorites?");

        if (confirmDelete) {

            const card = this.closest(".favorite-card");

            card.remove();

            checkFavorites();

        }

    });

});


/*======================================================
            CHECK IF FAVORITES EXIST
======================================================*/

function checkFavorites() {

    const cards = document.querySelectorAll(".favorite-card");

    if (cards.length === 0) {

        favoriteSection.style.display = "none";

        emptyFavorites.style.display = "block";

    }

}


/*======================================================
                BUTTON ANIMATION
======================================================*/

const buttons = document.querySelectorAll(".view-btn, .remove-btn");

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-2px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});


/*======================================================
                PAGE LOAD
======================================================*/

window.onload = function () {

    checkFavorites();

};