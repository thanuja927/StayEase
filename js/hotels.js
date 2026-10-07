// ==========================================
// STAYEASE HOTEL SEARCH
// ==========================================

let currentSearchLocation = "";


// ==========================================
// LOAD HOTELS FROM SUPABASE
// ==========================================

async function loadHotels() {

    const container =
        document.getElementById("featured-hotels");

    if (!container) {
        console.error("featured-hotels container not found.");
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("hotels")
            .select("*");

    if (error) {

        console.error(
            "Error loading hotels:",
            error
        );

        return;
    }

    console.log(
        "Hotels from Supabase:",
        data
    );
}


// ==========================================
// SET SEARCH DATE LIMITS
// ==========================================

function setSearchDates() {

    const checkInInput =
        document.getElementById("check-in");

    const checkOutInput =
        document.getElementById("check-out");


    if (!checkInInput || !checkOutInput) {

        console.warn(
            "Check-in or check-out input not found."
        );

        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    // Check-in cannot be before today

    checkInInput.min =
        todayString;


    // ==========================================
    // CHECK-OUT MINIMUM DATE
    // ==========================================

    if (checkInInput.value) {

        const selectedCheckIn =
            new Date(
                checkInInput.value +
                "T00:00:00"
            );


        selectedCheckIn.setDate(
            selectedCheckIn.getDate() + 1
        );


        const checkoutYear =
            selectedCheckIn.getFullYear();

        const checkoutMonth =
            String(
                selectedCheckIn.getMonth() + 1
            ).padStart(2, "0");

        const checkoutDay =
            String(
                selectedCheckIn.getDate()
            ).padStart(2, "0");


        const minimumCheckout =
            `${checkoutYear}-${checkoutMonth}-${checkoutDay}`;


        checkOutInput.min =
            minimumCheckout;


        if (
            checkOutInput.value &&
            checkOutInput.value < minimumCheckout
        ) {

            checkOutInput.value = "";

        }

    } else {

        checkOutInput.min =
            todayString;

    }


    console.log(
        "Selected dates:",
        checkInInput.value || "Not selected",
        checkOutInput.value || "Not selected"
    );
}


// ==========================================
// LOAD RECENT SEARCHES
// ==========================================

function loadRecentSearches() {

    const recentSearches =
        JSON.parse(
            localStorage.getItem(
                "recentSearches"
            ) || "[]"
        );


    displayRecentSearches(
        recentSearches
    );
}


// ==========================================
// SAVE RECENT SEARCH
// ==========================================

function saveRecentSearch(
    location,
    checkIn,
    checkOut,
    adults
) {

    let recentSearches =
        JSON.parse(
            localStorage.getItem(
                "recentSearches"
            ) || "[]"
        );


    const newSearch = {

        location:
            location,

        checkIn:
            checkIn,

        checkOut:
            checkOut,

        adults:
            adults

    };


    // Remove duplicate

    recentSearches =
        recentSearches.filter(
            function (search) {

                return !(
                    String(search.location || "")
                        .toLowerCase() ===
                    location.toLowerCase() &&

                    search.checkIn ===
                    checkIn &&

                    search.checkOut ===
                    checkOut &&

                    Number(search.adults) ===
                    Number(adults)
                );

            }
        );


    // Add newest first

    recentSearches.unshift(
        newSearch
    );


    // Keep only 5

    recentSearches =
        recentSearches.slice(0, 5);


    localStorage.setItem(
        "recentSearches",
        JSON.stringify(
            recentSearches
        )
    );


    displayRecentSearches(
        recentSearches
    );
}


// ==========================================
// DISPLAY RECENT SEARCHES
// ==========================================

function displayRecentSearches(searches) {

    const container =
        document.getElementById(
            "featured-hotels"
        );


    if (!container) {

        console.error(
            "featured-hotels container not found."
        );

        return;
    }


    container.innerHTML = "";


    if (
        !searches ||
        searches.length === 0
    ) {

        container.innerHTML = `

            <div class="recent-search-empty">

                <h3>
                    Start Your Search
                </h3>

                <p>
                    Search for hotels in any
                    destination around the world.
                </p>

            </div>

        `;

        return;
    }


    const heading =
        document.createElement("h2");


    heading.textContent =
        "Recent Searches";


    container.appendChild(
        heading
    );


    searches.forEach(
        function (search) {

            const card =
                document.createElement("div");


            card.className =
                "recent-search-card";


            const location =
                String(
                    search.location || ""
                );


            const checkIn =
                search.checkIn || "";


            const checkOut =
                search.checkOut || "";


            const adults =
                Number(
                    search.adults || 1
                );


            card.innerHTML = `

                <h3>
                    📍 ${location}
                </h3>

                <p>
                    📅 ${checkIn}
                    →
                    ${checkOut}
                </p>

                <p>
                    👥 ${adults}
                    Guest${adults > 1 ? "s" : ""}
                </p>

                <button
                    class="recent-search-button"
                >
                    Search Again
                </button>

            `;


            const button =
                card.querySelector(
                    ".recent-search-button"
                );


            button.addEventListener(
                "click",
                function () {

                    repeatSearch(
                        location,
                        checkIn,
                        checkOut,
                        adults
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );
}


// ==========================================
// REPEAT SEARCH
// ==========================================

function repeatSearch(
    location,
    checkIn,
    checkOut,
    adults
) {

    const locationInput =
        document.getElementById(
            "destination"
        );


    const checkInInput =
        document.getElementById(
            "check-in"
        );


    const checkOutInput =
        document.getElementById(
            "check-out"
        );


    const adultsInput =
        document.getElementById(
            "adults"
        );


    if (locationInput) {

        locationInput.value =
            location;

    }


    if (checkInInput) {

        checkInInput.value =
            checkIn;

    }


    if (checkOutInput) {

        checkOutInput.value =
            checkOut;

    }


    if (adultsInput) {

        adultsInput.value =
            adults;

    }


    setSearchDates();


    searchHotel();
}


// ==========================================
// HOTEL SEARCH
// ==========================================

async function searchHotel() {

    const locationInput =
        document.getElementById(
            "destination"
        );


    const checkInInput =
        document.getElementById(
            "check-in"
        );


    const checkOutInput =
        document.getElementById(
            "check-out"
        );


    const adultsInput =
        document.getElementById(
            "adults"
        );


    if (!locationInput) {

        console.error(
            "Destination input not found."
        );

        return;
    }


    // ==========================================
    // GET SEARCH VALUES
    // ==========================================

    const location =
        locationInput.value.trim();


    currentSearchLocation =
        location;


    if (!location) {

        alert(
            "Please enter a destination."
        );

        return;
    }


    const checkIn =
        checkInInput
            ? checkInInput.value
            : "";


    const checkOut =
        checkOutInput
            ? checkOutInput.value
            : "";


    const adults =
        adultsInput &&
        adultsInput.value
            ? Number(adultsInput.value)
            : 1;


    // ==========================================
    // VALIDATE DATES
    // ==========================================

    if (!checkIn || !checkOut) {

        alert(
            "Please select check-in and check-out dates."
        );

        return;
    }


    const checkInDate =
        new Date(
            checkIn +
            "T00:00:00"
        );


    const checkOutDate =
        new Date(
            checkOut +
            "T00:00:00"
        );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    if (checkInDate < today) {

        alert(
            "Check-in date cannot be in the past."
        );

        return;
    }


    if (checkOutDate <= checkInDate) {

        alert(
            "Check-out date must be after check-in date."
        );

        return;
    }


    // ==========================================
    // SAVE RECENT SEARCH
    // ==========================================

    saveRecentSearch(
        location,
        checkIn,
        checkOut,
        adults
    );


    // ==========================================
    // DEBUG
    // ==========================================

    console.log(
        "================================="
    );

    console.log(
        "Searching hotels for:",
        location
    );

    console.log(
        "Check-in:",
        checkIn
    );

    console.log(
        "Check-out:",
        checkOut
    );

    console.log(
        "Adults:",
        adults
    );

    console.log(
        "Calling Supabase Edge Function..."
    );

    console.log(
        "================================="
    );


    // ==========================================
    // CALL SUPER FUNCTION
    // ==========================================

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .functions
                .invoke(
                    "super-function",
                    {

                        body: {

                            location:
                                location,

                            check_in:
                                checkIn,

                            check_out:
                                checkOut,

                            adults:
                                adults

                        }

                    }
                );


        // ==========================================
        // EDGE FUNCTION ERROR
        // ==========================================

        if (error) {

            console.error(
                "Edge Function Error:",
                error
            );

            console.error(
                "Edge Function returned:",
                data
            );

            alert(
                "Unable to search hotels. Please try again."
            );

            return;
        }


        console.log(
            "SerpAPI hotel results:",
            data
        );


        // ==========================================
        // SERPAPI ERROR
        // ==========================================

        if (
            data &&
            data.error
        ) {

            console.error(
                "SerpAPI Error:",
                data.error
            );

            alert(
                "Hotel search error: " +
                data.error
            );

            return;
        }


        // ==========================================
        // GET HOTEL RESULTS
        // ==========================================

        const hotels =
            data?.properties || [];


        if (hotels.length === 0) {

            alert(
                "No hotels found for " +
                location +
                "."
            );

            return;
        }


        console.log(
            "Number of hotels found:",
            hotels.length
        );


        // ==========================================
        // DISPLAY RESULTS
        // ==========================================

        displaySearchResults(
            hotels
        );


    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        alert(
            "Something went wrong while searching for hotels."
        );

    }

}


// ==========================================
// DISPLAY SEARCH RESULTS
// ==========================================

function displaySearchResults(hotels) {

    const container =
        document.getElementById(
            "featured-hotels"
        );


    if (!container) {

        console.error(
            "featured-hotels container not found."
        );

        return;
    }


    container.innerHTML = "";


    // ==========================================
    // HEADING
    // ==========================================

    const heading =
        document.createElement("h2");


    heading.textContent =
        `Hotels in ${currentSearchLocation}`;


    container.appendChild(
        heading
    );


    // ==========================================
    // DISPLAY HOTELS
    // ==========================================

    hotels.forEach(
        function (hotel) {

            const card =
                document.createElement("div");


            card.className =
                "card";


            // ==========================================
            // IMAGE
            // ==========================================

            let image = "";


            if (
                hotel.images &&
                hotel.images.length > 0
            ) {

                image =
                    hotel.images[0].thumbnail ||
                    hotel.images[0].original ||
                    "";

            }


            // ==========================================
            // PRICE
            // ==========================================

            let price =
                "Price unavailable";


            if (
                hotel.rate_per_night &&
                hotel.rate_per_night.lowest
            ) {

                price =
                    hotel.rate_per_night.lowest;

            }


            // ==========================================
            // RATING
            // ==========================================

            let rating =
                "Rating unavailable";


            if (
                hotel.overall_rating !== undefined &&
                hotel.overall_rating !== null
            ) {

                rating =
                    hotel.overall_rating;

            }


            // ==========================================
            // LOCATION
            // ==========================================

            const hotelLocation =
                hotel.address ||
                hotel.city ||
                hotel.location ||
                currentSearchLocation ||
                "Location unavailable";


            // ==========================================
            // NAME
            // ==========================================

            const hotelName =
                hotel.name ||
                "Hotel";


            // ==========================================
            // IMAGE FALLBACK
            // ==========================================

            if (!image) {

                image =
                    "images/hotel-placeholder.jpg";

            }


            // ==========================================
            // HOTEL CARD
            // ==========================================

            card.innerHTML = `

                <img
                    src="${image}"
                    alt="${hotelName}"
                    onerror="
                        this.src='images/hotel-placeholder.jpg';
                    "
                >

                <h3>
                    ${hotelName}
                </h3>

                <p>
                    ⭐ ${rating}
                </p>

                <p>
                    📍 ${hotelLocation}
                </p>

                <p>
                    💰 ${price}
                </p>

                <button
                    class="view-details-btn"
                >
                    View Details
                </button>

            `;


            // ==========================================
            // VIEW DETAILS
            // ==========================================

            const detailsButton =
                card.querySelector(
                    ".view-details-btn"
                );


            detailsButton.addEventListener(
                "click",
                function () {

                    selectHotel(
                        hotel
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );


    // ==========================================
    // NO DISPLAYED RESULTS
    // ==========================================

    const displayedCards =
        container.querySelectorAll(
            ".card"
        );


    if (
        displayedCards.length === 0
    ) {

        container.innerHTML = `

            <div class="recent-search-empty">

                <h3>
                    No Hotels Found
                </h3>

                <p>
                    Try searching another destination.
                </p>

            </div>

        `;

    }

}


// ==========================================
// SELECT HOTEL
// ==========================================

function selectHotel(hotel) {

    console.log(
        "Hotel selected:",
        hotel
    );


    // ==========================================
    // GET CURRENT BOOKING DETAILS
    // ==========================================

    const checkInInput =
        document.getElementById(
            "check-in"
        );


    const checkOutInput =
        document.getElementById(
            "check-out"
        );


    const adultsInput =
        document.getElementById(
            "adults"
        );


    const checkIn =
        checkInInput
            ? checkInInput.value
            : "";


    const checkOut =
        checkOutInput
            ? checkOutInput.value
            : "";


    const adults =
        adultsInput &&
        adultsInput.value
            ? Number(
                adultsInput.value
            )
            : 1;


    // ==========================================
    // HOTEL IMAGE
    // ==========================================

    let hotelImage = "";


    if (
        hotel.images &&
        hotel.images.length > 0
    ) {

        hotelImage =
            hotel.images[0].original ||
            hotel.images[0].thumbnail ||
            "";

    }


    // ==========================================
    // HOTEL LOCATION
    // ==========================================

    const hotelCity =
        hotel.address ||
        hotel.city ||
        hotel.location ||
        currentSearchLocation ||
        "Location unavailable";


    // ==========================================
    // HOTEL RATING
    // ==========================================

    const hotelRating =
        hotel.overall_rating ??
        null;


    // ==========================================
    // HOTEL PRICE
    // ==========================================

    let hotelPrice =
        null;


    if (
        hotel.rate_per_night &&
        hotel.rate_per_night.lowest
    ) {

        hotelPrice =
            hotel.rate_per_night.lowest;

    }


    // ==========================================
    // PROPERTY TOKEN
    // ==========================================
    // THIS IS VERY IMPORTANT
    // We need this to get the exact rooms
    // and reviews for this hotel later.
    // ==========================================

    const propertyToken =
        hotel.property_token ||
        hotel.propertyToken ||
        null;


    // ==========================================
    // CREATE SELECTED HOTEL
    // ==========================================

    const selectedHotel = {

        // Basic information

        hotelName:
            hotel.name ||
            "Hotel",


        hotelCity:
            hotelCity,


        hotelRating:
            hotelRating,


        hotelPrice:
            hotelPrice,


        hotelImage:
            hotelImage,


        hotelDescription:
            hotel.description ||
            hotel.about ||
            "Enjoy a comfortable and memorable stay.",


        // ==========================================
        // IMPORTANT SERPAPI INFORMATION
        // ==========================================

        propertyToken:
            propertyToken,


        // Keep the original hotel object
        // so room-details.js has access to
        // all available SerpAPI information.

        originalHotel:
            hotel

    };


    // ==========================================
    // SAVE SELECTED HOTEL
    // ==========================================

    localStorage.setItem(
        "selectedHotel",
        JSON.stringify(
            selectedHotel
        )
    );


    // ==========================================
    // SAVE BOOKING DETAILS
    // ==========================================

    const bookingDetails = {

        location:
            currentSearchLocation,

        checkIn:
            checkIn,

        checkOut:
            checkOut,

        adults:
            adults

    };


    localStorage.setItem(
        "bookingDetails",
        JSON.stringify(
            bookingDetails
        )
    );


    // ==========================================
    // SAVE SELECTED HOTEL + BOOKING
    // DEBUG
    // ==========================================

    console.log(
        "================================="
    );

    console.log(
        "Selected hotel saved:",
        selectedHotel
    );

    console.log(
        "Property token:",
        propertyToken
    );

    console.log(
        "Booking details saved:",
        bookingDetails
    );

    console.log(
        "================================="
    );


    // ==========================================
    // GO TO ROOM DETAILS
    // ==========================================

    window.location.href =
        "room-details.html";

}


// ==========================================
// CHECK-IN CHANGE EVENT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const checkInElement =
            document.getElementById(
                "check-in"
            );


        if (checkInElement) {

            checkInElement.addEventListener(
                "change",
                function () {

                    setSearchDates();

                }
            );

        }

    }
);


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setSearchDates();

        loadRecentSearches();

        loadHotels();

    }
);