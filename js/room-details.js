// ======================================================
// STAYEASE - REAL HOTEL ROOM DETAILS
// ======================================================

console.log("=================================");
console.log("StayEase Room Details Started");
console.log("=================================");


// ======================================================
// GET SELECTED HOTEL
// ======================================================

let selectedHotel = null;

try {

    const storedHotel =
        localStorage.getItem("selectedHotel");

    if (storedHotel) {

        selectedHotel =
            JSON.parse(storedHotel);

    }

} catch (error) {

    console.error(
        "Could not read selectedHotel:",
        error
    );

}


// ======================================================
// GET BOOKING DETAILS
// ======================================================

let bookingDetails = null;

try {

    const storedBooking =
        localStorage.getItem("bookingDetails");

    if (storedBooking) {

        bookingDetails =
            JSON.parse(storedBooking);

    }

} catch (error) {

    console.error(
        "Could not read bookingDetails:",
        error
    );

}


// ======================================================
// PAGE ELEMENTS
// ======================================================

let hotelImageElement;
let hotelNameElement;
let hotelCityElement;
let hotelRatingElement;
let hotelPriceElement;
let hotelDescriptionElement;
let roomContainer;


// ======================================================
// FIND BOOKING INPUTS
// ======================================================

let checkInInput;
let checkOutInput;
let guestsInput;


// ======================================================
// INITIALIZE PAGE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Room Details DOM loaded"
        );

        initializeElements();

        displayHotelInformation();

        restoreBookingDetails();

        setupDateValidation();

        loadRealHotelDetails();

    }
);


// ======================================================
// INITIALIZE ELEMENTS
// ======================================================

function initializeElements() {

    hotelImageElement =
        document.getElementById(
            "hotelImage"
        );

    hotelNameElement =
        document.getElementById(
            "hotelName"
        );

    hotelCityElement =
        document.getElementById(
            "hotelCity"
        );

    hotelRatingElement =
        document.getElementById(
            "hotelRating"
        );

    hotelPriceElement =
        document.getElementById(
            "hotelPrice"
        );

    hotelDescriptionElement =
        document.getElementById(
            "hotelDescription"
        );

    roomContainer =
        document.querySelector(
            ".room-container"
        );


    // ==================================================
    // BOOKING INPUTS
    // ==================================================

    checkInInput =
        document.getElementById(
            "room-check-in"
        );


    checkOutInput =
        document.getElementById(
            "room-check-out"
        );


    guestsInput =
        document.getElementById(
            "room-guests"
        );


    // ==================================================
    // FALLBACK FOR OLD HTML
    // ==================================================

    const bookingCard =
        document.querySelector(
            ".booking-card"
        );


    if (bookingCard) {

        if (!checkInInput) {

            checkInInput =
                bookingCard.querySelector(
                    'input[type="date"]:nth-of-type(1)'
                );

        }


        if (!checkOutInput) {

            checkOutInput =
                bookingCard.querySelector(
                    'input[type="date"]:nth-of-type(2)'
                );

        }


        if (!guestsInput) {

            guestsInput =
                bookingCard.querySelector(
                    "select"
                );

        }

    }


    console.log(
        "Page elements initialized"
    );

}


// ======================================================
// DISPLAY SELECTED HOTEL INFORMATION
// ======================================================

function displayHotelInformation() {

    if (!selectedHotel) {

        console.error(
            "No selected hotel found."
        );

        showHotelError(
            "Hotel information could not be found."
        );

        return;

    }


    console.log(
        "Selected hotel:",
        selectedHotel
    );


    // ==================================================
    // HOTEL NAME
    // ==================================================

    if (hotelNameElement) {

        hotelNameElement.textContent =
            selectedHotel.hotelName ||
            "Hotel";

    }


    // ==================================================
    // HOTEL IMAGE
    // ==================================================

    if (
        hotelImageElement &&
        selectedHotel.hotelImage
    ) {

        hotelImageElement.src =
            selectedHotel.hotelImage;

        hotelImageElement.alt =
            selectedHotel.hotelName ||
            "Hotel";

    }


    // ==================================================
    // LOCATION
    // ==================================================

    if (hotelCityElement) {

        hotelCityElement.textContent =
            selectedHotel.hotelCity ||
            "Location unavailable";

    }


    // ==================================================
    // RATING
    // ==================================================

    if (hotelRatingElement) {

        const rating =
            selectedHotel.hotelRating;

        if (
            rating &&
            rating !== "Rating unavailable"
        ) {

            hotelRatingElement.textContent =
                "⭐ " + rating;

        } else {

            hotelRatingElement.textContent =
                "⭐ Rating unavailable";

        }

    }


    // ==================================================
    // PRICE
    // ==================================================

    if (hotelPriceElement) {

        const price =
            selectedHotel.hotelPrice;

        if (
            price &&
            price !== "Price unavailable"
        ) {

            hotelPriceElement.textContent =
                "💰 " + price;

        } else {

            hotelPriceElement.textContent =
                "💰 Price unavailable";

        }

    }


    // ==================================================
    // DESCRIPTION
    // ==================================================

    if (hotelDescriptionElement) {

        hotelDescriptionElement.textContent =
            selectedHotel.hotelDescription ||
            "Hotel information is being loaded.";

    }

}


// ======================================================
// RESTORE SEARCH / BOOKING DETAILS
// ======================================================

function restoreBookingDetails() {

    if (!bookingDetails) {

        console.log(
            "No previous booking details found."
        );

        return;

    }


    console.log(
        "Restoring booking details:",
        bookingDetails
    );


    // ==================================================
    // CHECK-IN
    // ==================================================

    if (
        checkInInput &&
        bookingDetails.checkIn
    ) {

        checkInInput.value =
            bookingDetails.checkIn;

    }


    // ==================================================
    // CHECK-OUT
    // ==================================================

    if (
        checkOutInput &&
        bookingDetails.checkOut
    ) {

        checkOutInput.value =
            bookingDetails.checkOut;

    }


    // ==================================================
    // GUESTS
    // ==================================================

    if (
        guestsInput &&
        bookingDetails.adults
    ) {

        const adults =
            Number(
                bookingDetails.adults
            );


        // If select element

        if (
            guestsInput.tagName ===
            "SELECT"
        ) {

            let optionFound = false;


            Array.from(
                guestsInput.options
            ).forEach(
                function (option) {

                    const optionNumber =
                        parseInt(
                            option.value
                        );


                    const optionTextNumber =
                        parseInt(
                            option.textContent
                        );


                    if (
                        optionNumber === adults ||
                        optionTextNumber === adults
                    ) {

                        option.selected =
                            true;

                        optionFound =
                            true;

                    }

                }
            );


            // If no matching option
            // try index

            if (
                !optionFound &&
                guestsInput.options.length >= adults
            ) {

                guestsInput.selectedIndex =
                    adults - 1;

            }

        } else {

            guestsInput.value =
                adults;

        }

    }


    setupDateValidation();

}


// ======================================================
// DATE VALIDATION
// ======================================================

function setupDateValidation() {

    if (!checkInInput) {
        return;
    }


    const today =
        new Date();


    const todayString =
        formatDate(today);


    checkInInput.min =
        todayString;


    if (checkOutInput) {

        if (checkInInput.value) {

            const checkIn =
                new Date(
                    checkInInput.value +
                    "T00:00:00"
                );


            checkIn.setDate(
                checkIn.getDate() + 1
            );


            checkOutInput.min =
                formatDate(checkIn);

        } else {

            checkOutInput.min =
                todayString;

        }

    }


    checkInInput.addEventListener(
        "change",
        function () {

            if (!checkOutInput) {
                return;
            }


            if (!checkInInput.value) {
                return;
            }


            const checkIn =
                new Date(
                    checkInInput.value +
                    "T00:00:00"
                );


            checkIn.setDate(
                checkIn.getDate() + 1
            );


            checkOutInput.min =
                formatDate(checkIn);


            if (
                checkOutInput.value &&
                checkOutInput.value <=
                checkInInput.value
            ) {

                checkOutInput.value =
                    "";

            }

        }
    );

}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


// ======================================================
// GET CURRENT GUEST COUNT
// ======================================================

function getGuestCount() {

    if (!guestsInput) {

        return 2;

    }


    if (
        guestsInput.tagName ===
        "SELECT"
    ) {

        const selectedOption =
            guestsInput.options[
            guestsInput.selectedIndex
            ];


        if (selectedOption) {

            const fromValue =
                parseInt(
                    selectedOption.value
                );


            if (!isNaN(fromValue)) {

                return fromValue;

            }


            const fromText =
                parseInt(
                    selectedOption.textContent
                );


            if (!isNaN(fromText)) {

                return fromText;

            }

        }

    }


    const number =
        Number(
            guestsInput.value
        );


    return number || 2;

}


// ======================================================
// LOAD REAL HOTEL DETAILS
// ======================================================

async function loadRealHotelDetails() {

    console.log(
        "================================="
    );

    console.log(
        "Loading real hotel information..."
    );


    if (!selectedHotel) {

        showRoomError(
            "No hotel was selected."
        );

        return;

    }


    // ==================================================
    // PROPERTY TOKEN
    // ==================================================

    const propertyToken =
        selectedHotel.propertyToken;


    console.log(
        "Property token:",
        propertyToken
    );


    if (!propertyToken) {

        console.error(
            "Property token is missing."
        );


        showRoomError(
            "Room information is unavailable for this hotel."
        );


        return;

    }


    // ==================================================
    // GET DATES
    // ==================================================

    let checkIn =
        checkInInput
            ? checkInInput.value
            : "";


    let checkOut =
        checkOutInput
            ? checkOutInput.value
            : "";


    // ==================================================
    // FALLBACK TO SAVED BOOKING
    // ==================================================

    if (!checkIn && bookingDetails) {

        checkIn =
            bookingDetails.checkIn ||
            "";

    }


    if (!checkOut && bookingDetails) {

        checkOut =
            bookingDetails.checkOut ||
            "";

    }


    // ==================================================
    // IF DATES ARE STILL EMPTY
    // ==================================================

    if (!checkIn || !checkOut) {

        const today =
            new Date();


        const tomorrow =
            new Date(today);


        tomorrow.setDate(
            tomorrow.getDate() + 1
        );


        const dayAfter =
            new Date(today);


        dayAfter.setDate(
            dayAfter.getDate() + 2
        );


        checkIn =
            formatDate(tomorrow);


        checkOut =
            formatDate(dayAfter);


        if (checkInInput) {

            checkInInput.value =
                checkIn;

        }


        if (checkOutInput) {

            checkOutInput.value =
                checkOut;

        }

    }


    const adults =
        getGuestCount();


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


    // ==================================================
    // LOADING MESSAGE
    // ==================================================

    showRoomLoading();


    try {

        // ==================================================
        // CALL SUPER FUNCTION
        // ==================================================

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

                            property_token:
                                propertyToken,

                            check_in:
                                checkIn,

                            check_out:
                                checkOut,

                            adults:
                                adults

                        }

                    }
                );


        console.log(
            "Real hotel details response:",
            data
        );


        // ==================================================
        // EDGE FUNCTION ERROR
        // ==================================================

        if (error) {

            console.error(
                "Room details Edge Function error:",
                error
            );


            showRoomError(
                "Unable to load room information."
            );


            return;

        }


        // ==================================================
        // API ERROR
        // ==================================================

        if (
            data &&
            data.error
        ) {

            console.error(
                "Hotel details API error:",
                data.error
            );


            showRoomError(
                data.error
            );


            return;

        }


        // ==================================================
        // GET PROPERTY
        // ==================================================

        const property =
            data.property ||
            data.hotel ||
            data.details ||
            data;


        console.log(
            "Property details:",
            property
        );


        // ==================================================
        // UPDATE HOTEL INFORMATION
        // ==================================================

        updateHotelFromRealData(
            property
        );


        // ==================================================
        // FIND ROOMS
        // ==================================================

        const rooms =
            extractRooms(
                property,
                data
            );


        console.log(
            "Real rooms found:",
            rooms
        );


        // ==================================================
        // DISPLAY ROOMS
        // ==================================================

        displayRealRooms(
            rooms,
            adults
        );


        // ==================================================
        // DISPLAY REVIEWS
        // ==================================================

        const reviews =
            extractReviews(
                property,
                data
            );


        console.log(
            "Real reviews found:",
            reviews
        );


        displayRealReviews(
            reviews,
            property
        );


    } catch (error) {

        console.error(
            "Room details request failed:",
            error
        );


        showRoomError(
            "Something went wrong while loading room details."
        );

    }

}


// ======================================================
// UPDATE HOTEL FROM REAL SERPAPI DATA
// ======================================================

function updateHotelFromRealData(
    property
) {

    if (!property) {
        return;
    }


    // ==================================================
    // NAME
    // ==================================================

    if (
        property.name &&
        hotelNameElement
    ) {

        hotelNameElement.textContent =
            property.name;

    }


    // ==================================================
    // LOCATION
    // ==================================================

    if (
        property.address &&
        hotelCityElement
    ) {

        hotelCityElement.textContent =
            property.address;

    }


    // ==================================================
    // RATING
    // ==================================================

    if (
        property.overall_rating &&
        hotelRatingElement
    ) {

        hotelRatingElement.textContent =
            "⭐ " +
            property.overall_rating;

    }


    // ==================================================
    // PRICE
    // ==================================================

    if (
        property.rate_per_night &&
        property.rate_per_night.lowest &&
        hotelPriceElement
    ) {

        hotelPriceElement.textContent =
            "💰 " +
            property.rate_per_night.lowest;

    }


    // ==================================================
    // DESCRIPTION
    // ==================================================

    if (
        property.description &&
        hotelDescriptionElement
    ) {

        hotelDescriptionElement.textContent =
            property.description;

    }


    // ==================================================
    // IMAGE
    // ==================================================

    if (
        property.images &&
        property.images.length > 0 &&
        hotelImageElement
    ) {

        const firstImage =
            property.images[0];


        const image =
            firstImage.original ||
            firstImage.original_image ||
            firstImage.thumbnail ||
            firstImage;


        if (image) {

            hotelImageElement.src =
                image;

        }

    }

}


// ======================================================
// EXTRACT REAL ROOMS
// ======================================================

function extractRooms(
    property,
    data
) {

    let rooms = [];


    // ==================================================
    // DIRECT ROOMS
    // ==================================================

    if (
        property &&
        Array.isArray(property.rooms)
    ) {

        rooms =
            property.rooms;

    }


    // ==================================================
    // FEATURED PRICES ROOMS
    // ==================================================

    if (
        rooms.length === 0 &&
        property &&
        Array.isArray(
            property.featured_prices
        )
    ) {

        property.featured_prices.forEach(
            function (priceSource) {

                if (
                    Array.isArray(
                        priceSource.rooms
                    )
                ) {

                    rooms =
                        rooms.concat(
                            priceSource.rooms
                        );

                }

            }
        );

    }


    // ==================================================
    // PRICES ROOMS
    // ==================================================

    if (
        rooms.length === 0 &&
        property &&
        Array.isArray(
            property.prices
        )
    ) {

        property.prices.forEach(
            function (priceSource) {

                if (
                    Array.isArray(
                        priceSource.rooms
                    )
                ) {

                    rooms =
                        rooms.concat(
                            priceSource.rooms
                        );

                }

            }
        );

    }


    // ==================================================
    // DATA LEVEL ROOMS
    // ==================================================

    if (
        rooms.length === 0 &&
        data &&
        Array.isArray(data.rooms)
    ) {

        rooms =
            data.rooms;

    }


    // ==================================================
    // REMOVE DUPLICATES
    // ==================================================

    const uniqueRooms =
        [];


    const roomNames =
        new Set();


    rooms.forEach(
        function (room) {

            if (!room) {
                return;
            }


            const name =
                room.name ||
                room.room_name ||
                "Room";


            const key =
                name.toLowerCase();


            if (
                !roomNames.has(key)
            ) {

                roomNames.add(key);

                uniqueRooms.push(
                    room
                );

            }

        }
    );


    return uniqueRooms;

}


// ======================================================
// DISPLAY REAL ROOMS
// ======================================================

function displayRealRooms(
    rooms,
    adults
) {

    if (!roomContainer) {

        console.error(
            "room-container not found."
        );

        return;

    }


    roomContainer.innerHTML = "";


    // ==================================================
    // NO ROOMS
    // ==================================================

    if (
        !rooms ||
        rooms.length === 0
    ) {

        roomContainer.innerHTML = `

            <div class="rooms-unavailable">

                <h3>
                    Rooms Not Available
                </h3>

                <p>
                    This hotel does not have
                    room information available
                    for the selected dates.
                </p>

            </div>

        `;

        return;

    }


    // ==================================================
    // FILTER ROOMS BY GUEST COUNT
    // ==================================================

    let suitableRooms =
        rooms.filter(
            function (room) {

                const capacity =
                    Number(
                        room.num_guests ||
                        room.max_guests ||
                        0
                    );


                if (!capacity) {

                    return true;

                }


                return capacity >= adults;

            }
        );


    // ==================================================
    // IF NOTHING MATCHES
    // SHOW ALL REAL ROOMS
    // ==================================================

    if (
        suitableRooms.length === 0
    ) {

        suitableRooms =
            rooms;

    }


    // ==================================================
    // CREATE ROOM CARDS
    // ==================================================

    suitableRooms.forEach(
        function (room, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "room-card";


            // ==================================================
            // ROOM NAME
            // ==================================================

            const roomName =
                room.name ||
                room.room_name ||
                "Available Room";


            // ==================================================
            // ROOM IMAGE
            // ==================================================

            let roomImage =
                "";


            if (
                Array.isArray(
                    room.images
                ) &&
                room.images.length > 0
            ) {

                const firstImage =
                    room.images[0];


                roomImage =
                    typeof firstImage ===
                        "string"
                        ? firstImage
                        : (
                            firstImage.original ||
                            firstImage.original_image ||
                            firstImage.thumbnail ||
                            ""
                        );

            }


            // ==================================================
            // GUEST COUNT
            // ==================================================

            const roomGuests =
                room.num_guests ||
                room.max_guests ||
                "Not specified";


            // ==================================================
// BED INFORMATION - HANDLE DIFFERENT SERPAPI FORMATS
// ==================================================

let bedsText = "Bed information unavailable";


// --------------------------------------------------
// FORMAT 1: beds array
// Example:
// beds: [
//   { count: 2, type: "Single" }
// ]
// --------------------------------------------------

if (
    Array.isArray(room.beds) &&
    room.beds.length > 0
) {

    const bedParts = room.beds
        .map(function (bed) {

            if (!bed) {
                return "";
            }

            // Object format
            if (typeof bed === "object") {

                const count =
                    bed.count ||
                    bed.number ||
                    bed.quantity ||
                    "";

                const type =
                    bed.type ||
                    bed.name ||
                    bed.bed_type ||
                    "";

                if (count && type) {
                    return `${count} ${type}`;
                }

                if (type) {
                    return type;
                }

                if (count) {
                    return `${count} Bed`;
                }
            }

            // String format
            if (typeof bed === "string") {
                return bed;
            }

            return "";

        })
        .filter(function (item) {
            return item !== "";
        });


    if (bedParts.length > 0) {

        bedsText =
            bedParts.join(", ");

    }

}


// --------------------------------------------------
// FORMAT 2: single bed field
// --------------------------------------------------

if (
    bedsText === "Bed information unavailable" &&
    room.bed
) {

    if (typeof room.bed === "string") {

        bedsText =
            room.bed;

    } else if (
        typeof room.bed === "object"
    ) {

        const count =
            room.bed.count ||
            room.bed.number ||
            room.bed.quantity ||
            "";

        const type =
            room.bed.type ||
            room.bed.name ||
            room.bed.bed_type ||
            "";

        if (count && type) {

            bedsText =
                `${count} ${type}`;

        } else if (type) {

            bedsText =
                type;

        }

    }

}


// --------------------------------------------------
// FORMAT 3: bed_type
// --------------------------------------------------

if (
    bedsText === "Bed information unavailable" &&
    room.bed_type
) {

    bedsText =
        String(room.bed_type);

}


// --------------------------------------------------
// FORMAT 4: bed_types
// --------------------------------------------------

if (
    bedsText === "Bed information unavailable" &&
    room.bed_types
) {

    if (Array.isArray(room.bed_types)) {

        bedsText =
            room.bed_types.join(", ");

    } else {

        bedsText =
            String(room.bed_types);

    }

}


// --------------------------------------------------
// FORMAT 5: room description may contain bed info
// --------------------------------------------------

if (
    bedsText === "Bed information unavailable"
) {

    const possibleText =
        room.description ||
        room.details ||
        room.room_description ||
        "";


    if (possibleText) {

        const text =
            String(possibleText);


        const bedMatch =
            text.match(
                /(\d+\s*)?(king|queen|single|double|twin|bunk|sofa)\s*(bed|beds)?/i
            );


        if (bedMatch) {

            bedsText =
                bedMatch[0];

        }

    }

}


            // ==================================================
            // PRICE
            // ==================================================

            let roomPrice =
                "Price unavailable";


            if (
                room.rate_per_night &&
                room.rate_per_night.lowest
            ) {

                roomPrice =
                    room.rate_per_night.lowest;

            }


            // ==================================================
            // TOTAL PRICE
            // ==================================================

            let totalPrice =
                "";


            if (
                room.total_rate &&
                room.total_rate.lowest
            ) {

                totalPrice =
                    room.total_rate.lowest;

            }


            // ==================================================
            // INCLUSIONS
            // ==================================================

            let inclusions =
                "";


            if (
                Array.isArray(
                    room.inclusions
                ) &&
                room.inclusions.length > 0
            ) {

                inclusions =
                    room.inclusions.join(
                        ", "
                    );

            }


            // ==================================================
            // BREAKFAST
            // ==================================================

            const breakfast =
                room.breakfast_included
                    ? "🍳 Breakfast included"
                    : "";


            // ==================================================
            // CANCELLATION
            // ==================================================

            const cancellation =
                room.free_cancellation
                    ? "✓ Free cancellation"
                    : "";


            // ==================================================
            // IMAGE HTML
            // ==================================================

            let imageHTML = "";


            if (roomImage) {

                imageHTML = `

                    <img
                        src="${roomImage}"
                        alt="${roomName}"
                        onerror="this.style.display='none';"
                    >

                `;

            }


            // ==================================================
            // CARD
            // ==================================================

            card.innerHTML = `

                ${imageHTML}

                <div class="room-card-content">

                    <h3>
                        ${escapeHTML(roomName)}
                    </h3>

                    <p>
                        👤 ${roomGuests} Guest${Number(roomGuests) > 1 ? "s" : ""}
                    </p>

                    <p class="room-bed-details">
                        🛏 ${escapeHTML(bedsText)}
                    </p>

                    ${inclusions
                    ? `
                                <p>
                                    ✓ ${escapeHTML(inclusions)}
                                </p>
                            `
                    : ""
                }

                    ${breakfast
                    ? `
                                <p>
                                    ${breakfast}
                                </p>
                            `
                    : ""
                }

                    ${cancellation
                    ? `
                                <p>
                                    ${cancellation}
                                </p>
                            `
                    : ""
                }

                    <h4>
                        💰 ${escapeHTML(roomPrice)}
                        / night
                    </h4>

                    ${totalPrice
                    ? `
                                <p>
                                    Total:
                                    ${escapeHTML(totalPrice)}
                                </p>
                            `
                    : ""
                }

                    <button
                        class="reserve-room-btn"
                        type="button"
                    >
                        Reserve Room
                    </button>

                </div>

            `;


            // ==================================================
            // RESERVE BUTTON
            // ==================================================

            const reserveButton =
                card.querySelector(
                    ".reserve-room-btn"
                );


            if (reserveButton) {

                reserveButton.addEventListener(
                    "click",
                    function () {

                        selectRoom(
                            room
                        );

                    }
                );

            }


            roomContainer.appendChild(
                card
            );

        }
    );

}


// ======================================================
// SELECT ROOM
// ======================================================

function selectRoom(room) {

    console.log(
        "Selected room:",
        room
    );


    const selectedRoom = {

        roomName:
            room.name ||
            room.room_name ||
            "Room",

        roomImage:
            getRoomImage(room),

        guests:
            room.num_guests ||
            room.max_guests ||
            "",

        beds:
            room.beds ||
            [],

        price:
            room.rate_per_night
                ? room.rate_per_night.lowest
                : "",

        totalPrice:
            room.total_rate
                ? room.total_rate.lowest
                : "",

        inclusions:
            room.inclusions ||
            [],

        breakfastIncluded:
            room.breakfast_included ||
            false,

        freeCancellation:
            room.free_cancellation ||
            false,

        link:
            room.link ||
            ""

    };


    localStorage.setItem(
        "selectedRoom",
        JSON.stringify(
            selectedRoom
        )
    );


    // ==================================================
    // UPDATE BOOKING DETAILS
    // ==================================================

    const updatedBooking = {

        checkIn:
            checkInInput
                ? checkInInput.value
                : (
                    bookingDetails
                        ? bookingDetails.checkIn
                        : ""
                ),

        checkOut:
            checkOutInput
                ? checkOutInput.value
                : (
                    bookingDetails
                        ? bookingDetails.checkOut
                        : ""
                ),

        adults:
            getGuestCount(),

        location:
            selectedHotel
                ? selectedHotel.hotelCity
                : "",

        hotelName:
            selectedHotel
                ? selectedHotel.hotelName
                : "",

        roomName:
            selectedRoom.roomName,

        roomPrice:
            selectedRoom.price

    };


    localStorage.setItem(
        "bookingDetails",
        JSON.stringify(
            updatedBooking
        )
    );


    console.log(
        "Selected room saved:",
        selectedRoom
    );


    console.log(
        "Updated booking:",
        updatedBooking
    );


    // ==================================================
    // GO TO PAYMENT
    // ==================================================

    window.location.href =
        "payment.html";

}


// ======================================================
// GET ROOM IMAGE
// ======================================================

function getRoomImage(room) {

    if (
        room &&
        Array.isArray(room.images) &&
        room.images.length > 0
    ) {

        const first =
            room.images[0];


        if (
            typeof first ===
            "string"
        ) {

            return first;

        }


        return (
            first.original ||
            first.original_image ||
            first.thumbnail ||
            ""
        );

    }


    return "";

}


// ======================================================
// EXTRACT REVIEWS
// ======================================================

function extractReviews(
    property,
    data
) {

    let reviews = [];


    // ==================================================
    // DIRECT REVIEWS
    // ==================================================

    if (
        data &&
        Array.isArray(data.reviews)
    ) {

        reviews =
            data.reviews;

    }


    // ==================================================
    // PROPERTY REVIEWS
    // ==================================================

    if (
        reviews.length === 0 &&
        property &&
        Array.isArray(property.reviews)
    ) {

        reviews =
            property.reviews;

    }


    // ==================================================
    // OTHER REVIEWS
    // ==================================================

    if (
        reviews.length === 0 &&
        property &&
        Array.isArray(
            property.other_reviews
        )
    ) {

        reviews =
            property.other_reviews
                .map(
                    function (item) {

                        return item.user_review
                            ? {
                                user:
                                    item.user_review.username,

                                rating:
                                    item.user_review.rating
                                        ? item.user_review.rating.score
                                        : "",

                                comment:
                                    item.user_review.comment,

                                date:
                                    item.user_review.date,

                                source:
                                    item.source

                            }
                            : null;

                    }
                )
                .filter(
                    function (review) {

                        return review !== null;

                    }
                );

    }


    return reviews;

}


// ======================================================
// DISPLAY REAL REVIEWS
// ======================================================

function displayRealReviews(
    reviews,
    property
) {

    // ==================================================
    // FIND REVIEWS SECTION
    // ==================================================

    let reviewsSection =
        document.querySelector(
            ".reviews"
        );


    // ==================================================
    // IF SECTION DOESN'T EXIST
    // CREATE ONE
    // ==================================================

    if (!reviewsSection) {

        reviewsSection =
            document.createElement(
                "section"
            );


        reviewsSection.className =
            "reviews";


        document.body.appendChild(
            reviewsSection
        );

    }


    // ==================================================
    // CLEAR OLD HARD-CODED REVIEWS
    // ==================================================

    reviewsSection.innerHTML = "";


    // ==================================================
    // TITLE
    // ==================================================

    const title =
        document.createElement(
            "h2"
        );


    title.className =
        "section-title";


    title.textContent =
        "Guest Reviews";


    reviewsSection.appendChild(
        title
    );


    // ==================================================
    // HOTEL REVIEW SUMMARY
    // ==================================================

    if (
        property &&
        property.overall_rating
    ) {

        const summary =
            document.createElement(
                "p"
            );


        summary.className =
            "review-summary";


        summary.textContent =
            `⭐ ${property.overall_rating} • ${property.reviews ||
            "No"
            } reviews`;


        reviewsSection.appendChild(
            summary
        );

    }


    // ==================================================
    // NO REVIEWS
    // ==================================================

    if (
        !reviews ||
        reviews.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );


        empty.textContent =
            "No detailed reviews are available for this hotel.";


        reviewsSection.appendChild(
            empty
        );


        return;

    }


    // ==================================================
    // REVIEW CONTAINER
    // ==================================================

    const container =
        document.createElement(
            "div"
        );


    container.className =
        "review-container";


    // ==================================================
    // DISPLAY REVIEWS
    // ==================================================

    reviews
        .slice(0, 10)
        .forEach(
            function (review) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "review-card";


                const user =
                    review.user ||
                    review.username ||
                    (
                        review.user &&
                        review.user.name
                    ) ||
                    "Guest";


                const rating =
                    review.rating &&
                        typeof review.rating ===
                        "object"
                        ? review.rating.score
                        : (
                            review.rating ||
                            ""
                        );


                const comment =
                    review.comment ||
                    review.text ||
                    "No review comment available.";


                const date =
                    review.date ||
                    "";


                const stars =
                    createStars(
                        rating
                    );


                card.innerHTML = `

                    <div class="stars">
                        ${stars}
                    </div>

                    <p>
                        "${escapeHTML(comment)}"
                    </p>

                    <h4>
                        - ${escapeHTML(
                    typeof user ===
                        "string"
                        ? user
                        : "Guest"
                )}
                    </h4>

                    ${date
                        ? `
                                <small>
                                    ${escapeHTML(date)}
                                </small>
                            `
                        : ""
                    }

                `;


                container.appendChild(
                    card
                );

            }
        );


    reviewsSection.appendChild(
        container
    );

}


// ======================================================
// CREATE STAR RATING
// ======================================================

function createStars(rating) {

    const number =
        Number(rating);


    if (
        !number ||
        isNaN(number)
    ) {

        return "⭐";

    }


    const rounded =
        Math.round(number);


    return (
        "⭐".repeat(
            Math.max(
                1,
                Math.min(
                    5,
                    rounded
                )
            )
        )
    );

}


// ======================================================
// SHOW ROOM LOADING
// ======================================================

function showRoomLoading() {

    if (!roomContainer) {
        return;
    }


    roomContainer.innerHTML = `

        <div class="rooms-loading">

            <h3>
                Loading Available Rooms...
            </h3>

            <p>
                Checking real room availability
                for your selected dates.
            </p>

        </div>

    `;

}


// ======================================================
// SHOW ROOM ERROR
// ======================================================

function showRoomError(message) {

    if (!roomContainer) {
        return;
    }


    roomContainer.innerHTML = `

        <div class="rooms-unavailable">

            <h3>
                Rooms Not Available
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

            <button
                type="button"
                onclick="window.history.back()"
            >
                Go Back
            </button>

        </div>

    `;

}


// ======================================================
// SHOW HOTEL ERROR
// ======================================================

function showHotelError(message) {

    if (hotelNameElement) {

        hotelNameElement.textContent =
            "Hotel Information Unavailable";

    }


    if (hotelDescriptionElement) {

        hotelDescriptionElement.textContent =
            message;

    }

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ======================================================
// BOOK YOUR STAY BUTTON
// ======================================================

function goToRooms() {

    const roomsSection =
        document.getElementById(
            "rooms"
        );


    if (roomsSection) {

        roomsSection.scrollIntoView({
            behavior: "smooth"
        });

        return;

    }


    if (roomContainer) {

        roomContainer.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// DEBUG
// ======================================================

console.log(
    "Room Details JS loaded successfully."
);
