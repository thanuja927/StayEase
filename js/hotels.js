
function searchHotel() {
    let city = document.getElementById("destination")
        .value
        .toLowerCase()
        .trim();

    let cards = document.querySelectorAll(".card");
    let found = false;

    cards.forEach(function (card) {

        let hotelCity = card.dataset.city.toLowerCase();

        if (hotelCity === city) {

            card.style.display = "block";

            found = true;
        }
        else {
            card.style.display = "none";
        }

    });

    if (city === "") {
        cards.forEach(function (card) {

            card.style.display = "block";

        });

        return;
    }

    if (!found) {

        alert("Sorry! No hotels are available in " + city + ".");

        cards.forEach(function (card) {

            card.style.display = "block";

        });

    }

    document.getElementById("featured-hotels")
        .scrollIntoView({ behavior: "smooth" });

}